import {
  addPackageJsonDependency,
  NodeDependency,
  NodeDependencyType,
} from '@schematics/angular/utility/dependencies';
import { Tree } from '@angular-devkit/schematics/src/tree/interface';
import { SchematicContext, Rule } from '@angular-devkit/schematics';

import { of, Observable } from 'rxjs';
import { map } from 'rxjs/operators';
import { appVersion } from '../../util/versions';


export function addPackageJsonDependencies(): Rule {
  return (tree: Tree, context: SchematicContext): Observable<Tree> => {
    return of('ngx-onesignal').pipe(
      map(name => {
        const nodeDependency: NodeDependency = {
          type: NodeDependencyType.Default,
          name,
          version: process.env.HAS_SANDBOX ? 'file:..' : appVersion,
          overwrite: false,
        };
        addPackageJsonDependency(tree, nodeDependency);
        context.logger.info(`✅️ Added dependency: ${name}`);
        return tree;
      }),
    );
  };
}
