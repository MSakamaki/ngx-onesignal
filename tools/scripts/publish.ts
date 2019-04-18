import { execSync } from 'child_process';

const replaceCmdColorExp = /[\u001b\u009b][[()#;?]*(?:[0-9]{1,4}(?:;[0-9]{0,4})*)?[0-9A-ORZcf-nqry=><]/g;

const exec = async (command: string, cwd = '.') =>
  await execSync(command, { cwd })
    .toString()
    .replace(replaceCmdColorExp, '');

const log = (txt: string) => console.log(txt);
const execLog = async (command: string, cwd?: string) =>
  exec(command, cwd).then(log);
const cpDist = async (filename: string) =>
  exec(`cp ${filename} dist/one-signal`);

(async () => {
  await execLog(`npm run build`);

  await cpDist('package.json');
  await cpDist('LICENSE');

  await execLog(`npm publish`, 'dist/one-signal');
})().catch(e => {
  console.error(e);
});
