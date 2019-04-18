import { Injectable, Inject } from '@angular/core';
import { DOCUMENT } from '@angular/common';
import { OneSignalOptions, ONESIGNAL_CONFIGURATION } from '../OneSignalOptions';
import { IOneSignal } from '../oneSignal';

declare var OneSignal: IOneSignal;

// @dynamic
@Injectable({
  providedIn: 'root',
})
export class OneSignalService {
  private scriptinitalize = false;
  private scriptURL = 'https://cdn.onesignal.com/sdks/OneSignalSDK.js';

  public get isSupported(): Promise<boolean> {
    return OneSignal.isPushNotificationsSupported();
  }

  public get isSubscribe(): Promise<boolean> {
    return Promise.all([
      OneSignal.isPushNotificationsEnabled(),
      OneSignal.isOptedOut(),
    ]).then(([hasSubscribe, hasOptedOut]) => hasSubscribe && !hasOptedOut);
  }

  public get isInitialized(): boolean {
    return this.scriptinitalize;
  }

  public async subscribe() {
    if (await OneSignal.isOptedOut()) {
      await OneSignal.setSubscription(true);
    } else {
      await OneSignal.registerForPushNotifications();
    }
  }

  public async unsubscribe() {
    if (await this.isSubscribe) {
      await OneSignal.setSubscription(false);
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
  }

  // private async syncState() {
  //   // this.supported = await OneSignal.isPushNotificationsSupported();
  //   // this.hasSubscribe = await OneSignal.isPushNotificationsEnabled();
  //   // this.hasOptedOut = await OneSignal.isOptedOut();
  // }
}
