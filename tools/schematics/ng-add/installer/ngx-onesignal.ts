import {
  addPackageJsonDependency,
  NodeDependency,
  NodeDependencyType,
} from '@schematics/angular/utility/dependencies';
import { Tree } from '@angular-devkit/schematics/src/tree/interface';
import { SchematicContext, Rule } from '@angular-devkit/schematics';
import { of } from 'rxjs';
import { map } from 'rxjs/operators';

export function addPackageJsonDependencies(pkgName: string, version: string, type: NodeDependencyType): Rule {
  return (tree: Tree, context: SchematicContext): any => {
    return of(pkgName).pipe(
      map(name => {
        const nodeDependency: NodeDependency = {
          type,
          name,
          version,
          overwrite: false,
        };
        addPackageJsonDependency(tree, nodeDependency);
        context.logger.info(`✅️ Added dependency: ${name}`);
        return tree;
      }),
    );
  };
}
