import { NgModule, ModuleWithProviders } from '@angular/core';
import { OneSignalOptions } from './interface';

@NgModule()
export class NgxOneSignalModule {
  static forRoot(
    options?: OneSignalOptions,
  ): ModuleWithProviders<NgxOneSignalModule> {
    return {
      ngModule: NgxOneSignalModule,
      providers: [{ provide: OneSignalOptions, useValue: options }],
    };
  }
}
