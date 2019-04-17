import { NgModule, ModuleWithProviders } from '@angular/core';

export class OneSignalOptions {
  appId: string;
  autoRegister: boolean;
  allowLocalhostAsSecureOrigin?: boolean;
  notifyButton?: {
    enabled: boolean;
  };
}

@NgModule({
  imports: [],
})
export class NgxOneSingalModule {
  static forRoot(oneSignalConfig: OneSignalOptions): ModuleWithProviders {
    return {
      ngModule: NgxOneSingalModule,
      providers: [{ provide: OneSignalOptions, useValue: oneSignalConfig }],
    };
  }
}
