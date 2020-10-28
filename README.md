# NgxOnesignal

Angular [OneSignal](https://onesignal.com/)

[![angular](https://img.shields.io/badge/angular-9+-red.svg)](https://angular.io/)
[![nrwl/nx](https://img.shields.io/badge/nx-8-blue.svg)](https://nx.dev/)
[![one signal](https://img.shields.io/badge/OneSignal--Website--SDK-latest-e34b4d.svg)](https://github.com/OneSignal/OneSignal-Website-SDK)

[![https://nodei.co/npm/ngx-onesignal.png?downloads=true&downloadRank=true&stars=true](https://nodei.co/npm/ngx-onesignal.png?downloads=true&downloadRank=true&stars=true)](https://www.npmjs.com/package/ngx-onesignal)

[![npm version](https://badge.fury.io/js/ngx-onesignal.svg)](https://badge.fury.io/js/ngx-onesignal)
[![Build Status](https://travis-ci.com/MSakamaki/ngx-onesignal.svg?branch=master)](https://travis-ci.com/MSakamaki/ngx-onesignal)
[![Maintainability](https://api.codeclimate.com/v1/badges/493932302a1a925b8f12/maintainability)](https://codeclimate.com/github/MSakamaki/ngx-onesignal/maintainability)
[![MIT License](http://img.shields.io/badge/license-MIT-blue.svg?style=flat)](LICENSE)
[![Node version](https://img.shields.io/node/v/ngx-onesignal.svg?style=flat)](http://nodejs.org/download/)
[![Conventional Commits](https://img.shields.io/badge/Conventional%20Commits-1.0.0-yellow.svg)](https://conventionalcommits.org)
[![dependencies Status](https://david-dm.org/MSakamaki/ngx-onesignal/status.svg)](https://david-dm.org/MSakamaki/ngx-onesignal)
[![HitCount](http://hits.dwyl.com/MSakamaki/ngx-onesignal.svg)](http://hits.dwyl.com/MSakamaki/ngx-onesignal)

## used

### 1. Sign Up [OneSignal](https://onesignal.com/)

make Custom Code APP and get appId.

### 2. run Angular cli + add

*`npx @angular/cli` will be replaced by the `ng` command if the angular cli is installed*

```sh
# generate angular project
npx @angular/cli new [project name]

# cahnge directory
cd [project name]

# add pwa
npx @angular/cli add @angular/pwa

# add onesignal
npx @angular/cli add ngx-onesignal --appId=[your onesignal appId]
```

### 3. custmize Angular app

see [sample code](https://github.com/MSakamaki/ngx-onesignal/tree/master/src/app)

### 4. build and run

```sh
# build production
npx ng build --prod

# npm run server
npx http-server ./dist/client -p 4000 -S -K tools/ssh/server.key -C tools/ssh/server.crt

# open onesignal https webpage
/Applications/Google\ Chrome.app/Contents/MacOS/Google\ Chrome --ignore-certificate-errors --user-data-dir=dist/chromeTemp
```

### 5. add Universal

```sh
# add universal
npx @angular/cli add @nguniversal/express-engine --clientProject [project name]

# build universal
npm run build:ssr

# run server ( http://localhost:4000 )
npm run serve:ssr
```

## Supported

|  Angular version  |  ngx-onestop version  | support |
| ---- | ---- | ---- |
|  10  | 10.x  | ○ |
|  9  |  10.x  | ○ |
|  8  |  8.x  | - |
|  7  |  8.x  | - |

## Development environment support

+ OSX 10.x
+ node v12

## Tasks

+ [x] format (prettier)
+ [x] npm publish
+ [x] ng_add
  + [x] add NgxOneSignalModule to root module
  + [x] add OneSignalSDKWorkers file
  + [x] add OneSignalSDKWorkers to `angular.json`
  + [x] replace ServiceWorkerModule.register file
+ [x] [sandbox test](https://www.kevinschuchard.com/blog/2018-11-20-schematic-sandbox/)
+ [ ] unit testing
+ [ ] e2e testing
  + [ ] cypress
+ [x] universal
+ [x] [nrwl/nx](https://nx.dev/) workspace support
+ [x] ci/cd
