import { Injectable, Inject } from '@angular/core';
import { DOCUMENT } from '@angular/common';
import {
  OneSignalStub,
  OneSignalOptions,
  OneSignalStubFuncionList,
} from '../interface';
import { ExecIf } from '../decorators';
import { BehaviorSubject } from 'rxjs';
import { map, shareReplay } from 'rxjs/operators';

declare var OneSignal: OneSignalStub;

interface OnsSignalSubscribed {
  isSubscribed: boolean;
  userId: string;
  registrationId: string;
  notificationPermission: string;
  optedOut: boolean;
  serviceWorkerActive: string;
}

const isSubscribe = ({
  isSubscribed,
  userId,
  registrationId,
  notificationPermission,
  optedOut,
  serviceWorkerActive,
}: OnsSignalSubscribed): boolean =>
  isSubscribed &&
  Boolean(userId) &&
  Boolean(registrationId) &&
  notificationPermission === 'granted' &&
  optedOut === false &&
  Boolean(serviceWorkerActive);

const hasSubsctibed = (
  oneSignal: OneSignalStub,
): Promise<OnsSignalSubscribed> =>
  Promise.all([
    oneSignal.isPushNotificationsEnabled(),
    oneSignal.getUserId(),
    oneSignal.getRegistrationId(),
    oneSignal.getNotificationPermission(),
    oneSignal.isOptedOut(),
    oneSignal.context.serviceWorkerManager.getActiveState(),
  ]).then(
    ([
      isSubscribed,
      userId,
      registrationId,
      notificationPermission,
      optedOut,
      serviceWorkerActive,
    ]) => ({
      isSubscribed,
      userId,
      registrationId,
      notificationPermission,
      optedOut,
      serviceWorkerActive,
    }),
  );

// @dynamic
@Injectable({
  providedIn: 'root',
})
export class OneSignalService {
  private scriptinitalize = false;
  private readonly scriptURL = 'https://cdn.onesignal.com/sdks/OneSignalSDK.js';

  private readonly isSupportedSubject$ = new BehaviorSubject<boolean>(false);
  private readonly SubscribeStateSubject$ = new BehaviorSubject<
    OnsSignalSubscribed
  >({
    isSubscribed: false,
    userId: '',
    registrationId: '',
    notificationPermission: '',
    optedOut: true,
    serviceWorkerActive: '',
  });
  private readonly isOptedOutSubject$ = new BehaviorSubject<boolean>(false);
  private readonly isPushNotificationsEnabledSubject$ = new BehaviorSubject<
    boolean
  >(false);
  private readonly userIdSubject$ = new BehaviorSubject<string | null>(null);

  /**
   * @see {@link https://documentation.onesignal.com/docs/web-push-sdk#ispushnotificationssupported}
   */
  public readonly isSupported$ = this.isSupportedSubject$.asObservable();
  /**
   * @see {@link https://documentation.onesignal.com/docs/web-push-sdk#ispushnotificationsenabled}
   */
  public readonly isPushNotificationsEnabled$ = this.isPushNotificationsEnabledSubject$.asObservable();
  /**
   * @see {@link https://documentation.onesignal.com/docs/troubleshooting-web-push#3-check-if-you-are-subscribed}
   */
  public readonly subscribeState$ = this.SubscribeStateSubject$.asObservable().pipe(
    shareReplay(1),
  );
  /**
   * @see {@link https://documentation.onesignal.com/docs/troubleshooting-web-push#3-check-if-you-are-subscribed}
   */
  public readonly isSubscribe$ = this.subscribeState$.pipe(map(isSubscribe));
  public readonly userId$ = this.userIdSubject$.asObservable();

  public get isSupported(): boolean {
    return this.isSupportedSubject$.value;
  }

  public get isSubscribe(): boolean {
    return isSubscribe(this.SubscribeStateSubject$.value);
  }

  public get isInitialized(): boolean {
    return this.scriptinitalize;
  }

  public get isOptedOut(): boolean {
    return this.isOptedOutSubject$.value;
  }

  public get userId(): string {
    return this.userIdSubject$.value;
  }

  @ExecIf('isInitialized')
  public subscribe() {
    if (this.isSupported) {
      if (this.isOptedOutSubject$.value) {
        OneSignal.setSubscription(true);
      } else {
        OneSignal.registerForPushNotifications();
      }
    }
  }

  /**
   * call OneSignal.setSubscription(false)
   * @see {@link https://documentation.onesignal.com/docs/web-push-sdk#section--setsubscription-}
   */
  @ExecIf('isInitialized')
  public unsubscribe() {
    if (this.isSubscribe) {
      OneSignal.setSubscription(false);
    }
  }

  /**
   * https://documentation.onesignal.com/docs/web-push-sdk#section-loading-sdk-asynchronously
   * @param items push(["functionName", param1, param2]);
   * @example
   * ngxOneSignal.push(['sendTag', 'key', 'value', function(tagsSent) {
   *   // Callback called when tags have finished sending
   * }]);
   * // or
   * ngxOneSignal.push(['sendTag', 'key', 'value']).then((tagsSent) => {
   *   // Callback called when tags have finished sending
   * });
   */
  @ExecIf('isInitialized')
  public push(items: any[]) {
    if (this.isSupported) {
      return OneSignal.push(items);
    } else {
      return Promise.resolve();
    }
  }

  constructor(
    @Inject(DOCUMENT) private readonly doc: Document,
    private readonly options: OneSignalOptions,
  ) {
    this.init();
  }

  private async init() {
    try {
      if (!this.scriptinitalize) {
        await this.addScript();
        await this.initOneSignal();
        this.scriptinitalize = true;
      }
    } catch {
      this.scriptinitalize = false;
    }
  }

  private addScript() {
    return new Promise<Event>((resolve, reject) => {
      const head = this.doc.getElementsByTagName('head')[0];
      const script = this.doc.createElement('script');
      script.type = 'text/javascript';
      script.onload = resolve;
      script.onerror = reject;
      script.src = this.scriptURL;
      head.appendChild(script);
    });
  }

  private async initOneSignal() {
    await OneSignal.init({
      ...this.options,
    });

    await OneSignal.on('subscriptionChange', async () => {
      this.SubscribeStateSubject$.next(await hasSubsctibed(OneSignal));
    });

    // https://documentation.onesignal.com/docs/web-push-sdk#section-subscription-change
    this.isSupportedSubject$.next(
      await OneSignal.isPushNotificationsSupported(),
    );
    this.isPushNotificationsEnabledSubject$.next(
      await OneSignal.isPushNotificationsEnabled(),
    );
    this.isOptedOutSubject$.next(await OneSignal.isOptedOut());
    this.SubscribeStateSubject$.next(await hasSubsctibed(OneSignal));
    this.userIdSubject$.next(await OneSignal.getUserId());
  }
}
