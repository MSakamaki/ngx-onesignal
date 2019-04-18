import {
  Rule,
  SchematicContext,
  Tree,
  chain,
} from '@angular-devkit/schematics';

import {
  NodePackageInstallTask,
  RunSchematicTask,
} from '@angular-devkit/schematics/tasks';
import { Schema as ngxOneSignalSchema } from './schema';
import { installDependencies } from './installer/dependencies';
import { addPackageJsonDependencies } from './installer/ngx-onesignal';

export function ngxOnesignal(options: ngxOneSignalSchema): Rule {
  return (tree: Tree, context: SchematicContext) => {
    return chain([
      addPackageJsonDependencies(),
      installDependencies(),
      setupProject(options),
    ])(tree, context);
  };
}


function setupProject(options: ngxOneSignalSchema): Rule {
  return (tree: Tree, context: SchematicContext) => {
    const installTaskId = context.addTask(new NodePackageInstallTask());
    context.addTask(new RunSchematicTask('setup', options), [
      installTaskId,
    ]);
    return tree;
  };
}
