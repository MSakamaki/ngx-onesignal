# NgxOnesignal

Angular 7+ [OneSignal](https://onesignal.com/) Service

## used

### 1. Sign Up [OneSignal](https://onesignal.com/) 

make Custom Code APP and get appId.

### 2. run angular cli + add

```sh
# generate angular project
npx ng new [project name]

# add pwa
npx ng add @angular/pwa

# add onesignal
npx ng add ngx-onesignal --appId=[ your onesignal appId ]

# add universal
npx ng add @nguniversal/express-engine --clientProject [project name]

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
