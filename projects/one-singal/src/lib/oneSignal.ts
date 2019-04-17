import { OneSignalOptions } from './one-singal.module';

export interface IOneSignal {
  init: (options: OneSignalOptions) => Promise<void>;
  registerForPushNotifications: () => Promise<void>;
  getUserId: () => Promise<string>;
  setSubscription: (unmute: boolean) => Promise<void>;
  isPushNotificationsEnabled: () => Promise<boolean>;
  isOptedOut: () => Promise<boolean>;
  isPushNotificationsSupported: () => Promise<boolean>;

  push: (fnc: Array<string | any>) => void;
  on: (func: string, callback: (result: any) => void) => void;
}
