/**
 * @see {@link https://github.com/OneSignal/OneSignal-Website-SDK/blob/master/src/utils/OneSignalStub.ts}
 */
export type OneSignalStubFuncionList =
  | 'init'
  | '_initHttp'
  | 'isPushNotificationsEnabled'
  | 'showHttpPrompt'
  | 'registerForPushNotifications'
  | 'setDefaultNotificationUrl'
  | 'setDefaultTitle'
  | 'syncHashedEmail'
  | 'getTags'
  | 'sendTag'
  | 'sendTags'
  | 'deleteTag'
  | 'deleteTags'
  | 'addListenerForNotificationOpened'
  | 'getIdsAvailable'
  | 'setSubscription'
  | 'showHttpPermissionRequest'
  | 'showNativePrompt'
  | 'showSlidedownPrompt'
  | 'getNotificationPermission'
  | 'getUserId'
  | 'getRegistrationId'
  | 'getSubscription'
  | 'sendSelfNotification'
  | 'setEmail'
  | 'logoutEmail'
  | 'setExternalUserId'
  | 'removeExternalUserId'
  | 'getExternalUserId'
  | 'provideUserConsent'
  | 'isOptedOut'
  | 'getEmailId';

export interface OneSignalStub {
  init: (options: OneSignalOptions) => Promise<void>;
  registerForPushNotifications: () => Promise<void>;
  getUserId: () => Promise<string>;
  setSubscription: (unmute: boolean) => Promise<void>;
  isPushNotificationsEnabled: () => Promise<boolean>;
  isOptedOut: () => Promise<boolean>;
  isPushNotificationsSupported: () => Promise<boolean>;
  subscriptionChange: (fnc: (isSubscribed: boolean) => void) => Promise<void>;

  push: (fnc: Array<string | any>) => void;
  on: (func: string, callback: (result: any) => void) => void;
}

/**
 * initialize OneSignal.
 * @see {@link https://documentation.onesignal.com/docs/web-push-sdk#section--init-}
 */
export abstract class OneSignalOptions {
  appId: string;
  autoRegister?: boolean;
  allowLocalhostAsSecureOrigin?: boolean;
  [prop: string]: any;
}
