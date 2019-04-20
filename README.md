# NgxOnesignal

Angular 7+ [OneSignal](https://onesignal.com/) Service

## used

### 1. Sign Up [OneSignal](https://onesignal.com/)

make Custom Code APP and get appId.

### 2. run angular cli + add

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

# add universal
npx @angular/cli add @nguniversal/express-engine --clientProject [project name]

```

### 3. custmize angular app

see [sample code](https://github.com/MSakamaki/ngx-onesignal/tree/master/src/app)

### 4. build and run

```sh
# build universal
npm run build:ssr

# run server ( http://localhost:4000 )
npm run serve:ssr
```

## Development environment support

+ OSX 10.x
+ node v10

## Tasks

+ [x] format (prettier)
+ [x] npm publish
+ [x] ng_add
  + [x] add NgxOneSignalModule to root module
  + [x] add OneSignalSDKWorkers file
  + [x] add OneSignalSDKWorkers to angular.json
  + [x] replace ServiceWorkerModule.register file
+ [x] [sandbox test](https://www.kevinschuchard.com/blog/2018-11-20-schematic-sandbox/)
+ [ ] unit testing
+ [ ] e2e testing
  + [ ] cypress
+ [x] universal
+ [ ] [nrwl/nx](https://nx.dev/) workspace support
+ [ ] ci/cd
