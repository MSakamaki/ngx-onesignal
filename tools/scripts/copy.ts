import { copyFileSync, mkdirSync } from 'fs';
import { resolve } from 'path';

const target = '../../tools/schematics';
const output = '../../dist/schematics';

const makedirs: string[] = ['ng-add/files'];

const files: string[] = [
  'tsconfig.json',
  'collection.json',
  'ng-add/schema.json',
  'ng-add/files/OneSignalSDKUpdaterWorker.js',
  'ng-add/files/OneSignalSDKWorker.js',
];

for (const mkdir of makedirs) {
  mkdirSync(resolve(__dirname, output, mkdir));
}

for (const file of files) {
  copyFileSync(
    resolve(__dirname, target, file),
    resolve(__dirname, output, file),
  );
}
