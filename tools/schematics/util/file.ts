import { Tree } from '@angular-devkit/schematics/src/tree/interface';
import { SchematicsException } from '@angular-devkit/schematics';
import { SourceFile } from 'typescript';
import { ts } from '@angular/cdk/schematics';


export function readIntoSourceFile(host: Tree, fileName: string): SourceFile {
  const buffer = host.read(fileName);
  if (buffer === null) {
    throw new SchematicsException(`File ${fileName} does not exist.`);
  }

  return ts.createSourceFile(
    fileName,
    buffer.toString('utf-8'),
    ts.ScriptTarget.Latest,
    true
  );
}
