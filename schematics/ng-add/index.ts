import { Rule, SchematicContext, Tree } from '@angular-devkit/schematics';

// You don't have to export the function as default. You can also have more than one rule factory
// per file.
// tslint:disable-next-line:variable-name
export function ngxOnesignal(_options: any): Rule {
  // tslint:disable-next-line:variable-name
  return (tree: Tree, _context: SchematicContext) => {
    return tree;
  };
}
