import { NgModule, ModuleWithProviders, Optional, Inject } from '@angular/core';
import { OneSignalService } from './service/one-signal.service';
import { OneSignalOptions, ONESIGNAL_CONFIGURATION } from './OneSignalOptions';

// export function createSettingsService() {
//   return new OneSignalService();
// }

@NgModule()
export class NgxOneSignalModule {
  static forRoot(
    options?: OneSignalOptions,
  ): ModuleWithProviders<NgxOneSignalModule> {
    return {
      ngModule: NgxOneSignalModule,
      providers: [
        { provide: OneSignalOptions, useValue: options },
        // { provide: ONESIGNAL_CONFIGURATION, useValue: options ? options : {} },
        // {
        //   provide: OneSignalService,
        //   useFactory: createSettingsService,
        //   // deps: [ ONESIGNAL_CONFIGURATION ]
        // }
      ],
    };
  }
}
