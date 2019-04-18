import { InjectionToken } from '@angular/core';

export const ONESIGNAL_CONFIGURATION = new InjectionToken<OneSignalOptions>(
  'ONESIGNAL_CONFIGURATION',
);

export abstract class OneSignalOptions {
  appId: string;
  autoRegister?: boolean;
  allowLocalhostAsSecureOrigin?: boolean;
  notifyButton?: {
    enabled: boolean;
  };
}
