const pkg: { version: string; peerDependencies: any } = require('../../../package.json');

export const appVersion = pkg.version;
export const angularCdkVersion = pkg.peerDependencies['@angular/cdk'] as string;
