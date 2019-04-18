import { red } from '@angular-devkit/core/src/terminal';
import {
  chain,
  Rule,
  SchematicContext,
  Tree,
  apply,
  url,
  template,
  move,
  mergeWith,
  MergeStrategy,
} from '@angular-devkit/schematics';
import {
  addModuleImportToRootModule,
  getProjectFromWorkspace,
  getProjectMainFile,
  hasNgModuleImport,
  getProjectTargetOptions,
  ts,
} from '@angular/cdk/schematics';
import { getWorkspace } from '@schematics/angular/utility/config';
import { getSourceNodes } from '@schematics/angular/utility/ast-utils';
import { getAppModulePath } from '@schematics/angular/utility/ng-ast-utils';
import { Schema as ngxOneSignalSchema } from './schema';
import { strings } from '@angular-devkit/core';
import { readIntoSourceFile } from '../util/file';

export default function(options: ngxOneSignalSchema): Rule {
  return (tree: Tree, context: SchematicContext) => {
    return chain([
      addNgxOnesignalModule(options),
      addOneSignalSDKWorkers(options),
      updateAngularJson(options),
      replaceServiceWorkerScript(options)
    ])(tree, context);
  };
}

function addNgxOnesignalModule(options: ngxOneSignalSchema): Rule {
  return (tree: Tree, context: SchematicContext) => {
    const MODULE_NAME = `NgxOneSignalModule.forRoot({ appId: '${options.appId}'}),`;
    const workspace = getWorkspace(tree);
    const project = getProjectFromWorkspace(workspace, options.project);
    const appModulePath = getAppModulePath(tree, getProjectMainFile(project));

    if (hasNgModuleImport(tree, appModulePath, MODULE_NAME)) {
      return console.warn(
        red(
          `Could not import "NgxOneSignalModule" because "NgxOneSignalModule" is already imported.`,
        ),
      );
    }

    addModuleImportToRootModule(tree, MODULE_NAME, 'ngx-onesignal', project);
    context.logger.info('✅️ Import NgxOneSignalModule into root module');
    return tree;
  };
}

function addOneSignalSDKWorkers(options: ngxOneSignalSchema): Rule {
  return (tree: Tree, context: SchematicContext) => {
    const workspace = getWorkspace(tree);
    const templateSource = apply(url('./files'), [
      template({
        ...strings,
        ...options,
      }),
      move(getProjectFromWorkspace(workspace, options.project).sourceRoot)
    ]);

    return mergeWith(templateSource, MergeStrategy.Default)(tree, context);
  };
}

function updateAngularJson(options: ngxOneSignalSchema): Rule {
  return (tree: Tree) => {
    const workspace = getWorkspace(tree);
    const project = getProjectFromWorkspace(workspace, options.project);
    const targetOptions = getProjectTargetOptions(project, 'build');

    if (targetOptions.assets) {
      targetOptions.assets = [
        'src/OneSignalSDKWorker.js',
        'src/OneSignalSDKUpdaterWorker.js',
        ...targetOptions.assets
      ];
    } else {
      targetOptions.assets = [
        'src/OneSignalSDKWorker.js',
        'src/OneSignalSDKUpdaterWorker.js',
      ];
    }
    tree.overwrite('angular.json', JSON.stringify(workspace, null, 2));

    return tree;
  };
}


function replaceServiceWorkerScript(options: ngxOneSignalSchema): Rule {
  return (tree: Tree, context: SchematicContext) => {
    const workspace = getWorkspace(tree);
    const project = getProjectFromWorkspace(workspace, options.project);
    const modulePath = getAppModulePath(tree, getProjectMainFile(project));

    if (!modulePath) {
      return context.logger.warn(
        `❌ Could not find environment file: "${modulePath}". Skipping firebase configuration.`
      );
    }

    const insertion = `'OneSignalSDKWorker.js'`;
    const sourceFile = readIntoSourceFile(tree, modulePath);

    const sourceFileText = sourceFile.getText();
    if (sourceFileText.includes(insertion)) {
      return;
    }

    const nodes = getSourceNodes(sourceFile as any);
    // tslint:disable-next-line:no-non-null-assertion
    const serviceWorkerScript = nodes.find(
      node => node.kind === ts.SyntaxKind.StringLiteral &&
      node.getText(sourceFile) === `'ngsw-worker.js'`
    );
    const recorder = tree.beginUpdate(modulePath);
    recorder.remove(serviceWorkerScript.pos, serviceWorkerScript.getFullWidth());
    recorder.insertLeft(serviceWorkerScript.pos, insertion);
    tree.commitUpdate(recorder);

    context.logger.info('✅️ Environment configuration');
    return tree;
  };
}
