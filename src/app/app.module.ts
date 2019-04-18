import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';
import { NgxOneSignalModule } from 'ngx-onesignal';
import { AppComponent } from './app.component';
import { ServiceWorkerModule } from '@angular/service-worker';
import { environment } from '../environments/environment';
import { appId } from './onesignal-key';

@NgModule({
  declarations: [AppComponent],
  imports: [
    NgxOneSignalModule.forRoot({
      appId,
      allowLocalhostAsSecureOrigin: true,
      autoRegister: false,
      notifyButton: {
        enabled: false,
      },
    }),
    BrowserModule,
    ServiceWorkerModule.register('OneSignalSDKWorker.js', {
      enabled: environment.production,
    }),
  ],
  providers: [],
  bootstrap: [AppComponent],
})
export class AppModule {}
