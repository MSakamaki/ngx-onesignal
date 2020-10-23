import { Injectable, Inject } from '@angular/core';
import { DOCUMENT } from '@angular/common';
import {
  OneSignalStub,
  OneSignalOptions,
  OneSignalStubFuncionList,
} from '../interface';
import { ExecIf } from '../decorators';
import { BehaviorSubject } from 'rxjs';

declare var OneSignal: OneSignalStub;

// @dynamic
@Injectable({
  providedIn: 'root',
})
export class OneSignalService {
  private scriptinitalize = false;
  private readonly scriptURL = 'https://cdn.onesignal.com/sdks/OneSignalSDK.js';

  private readonly isSupported$ = new BehaviorSubject<boolean>(false);
  private readonly isSubscribe$ = new BehaviorSubject<boolean>(false);
  private readonly isOptedOut$ = new BehaviorSubject<boolean>(false);
  private readonly isPushNotificationsEnabled$ = new BehaviorSubject<boolean>(
    false,
  );
  private readonly userIdSubject$ = new BehaviorSubject<string | null>(null);
  public readonly userId$ = this.userIdSubject$.asObservable();

  public get isSupported(): boolean {
    return this.isSupported$.value;
  }

  public get isSubscribe(): boolean {
    return this.isSubscribe$.value;
  }

  public get isInitialized(): boolean {
    return this.scriptinitalize;
  }

  public get isOptedOut(): boolean {
    return this.isOptedOut$.value;
  }

  public get userId(): string {
    return this.userIdSubject$.value;
  }

  @ExecIf('isInitialized')
  public subscribe() {
    if (this.isSupported) {
      if (this.isOptedOut$.value) {
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

    await OneSignal.on('subscriptionChange', isSubscribed => {
      this.isSubscribe$.next(isSubscribed);
    });

    // https://documentation.onesignal.com/docs/web-push-sdk#section-subscription-change
    this.isSupported$.next(await OneSignal.isPushNotificationsSupported());
    this.isPushNotificationsEnabled$.next(
      await OneSignal.isPushNotificationsEnabled(),
    );
    this.isOptedOut$.next(await OneSignal.isOptedOut());

    this.isSubscribe$.next(
      await Promise.all([
        OneSignal.isPushNotificationsEnabled(),
        OneSignal.isOptedOut(),
      ]).then(([hasSubscribe, hasOptedOut]) => hasSubscribe && !hasOptedOut),
    );
    this.userIdSubject$.next(await OneSignal.getUserId());
  }
}
