import { Injectable, Inject } from '@angular/core';
import { DOCUMENT } from '@angular/common';
import { Cache } from '../decorator/cache.decolator';
import { OneSignalOptions } from '../one-singal.module';
import { IOneSignal } from '../oneSignal';

declare var OneSignal: IOneSignal;

/** @dynamic */
@Injectable({
  providedIn: 'root',
})
export class OneSingalService {
  private scriptinitalize = false;
  private scriptURL = 'https://cdn.onesignal.com/sdks/OneSignalSDK.js';

  @Cache({ pool: 'OneSignal' }) private hasSubscribe;
  @Cache({ pool: 'OneSignal' }) private hasOptedOut;
  @Cache({ pool: 'OneSignal' }) private supported;

  public get isSupported(): boolean {
    return this.supported;
  }

  public get isSubscribe(): boolean {
    return this.hasSubscribe && !this.hasOptedOut;
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
    await this.syncState();
  }

  public async unsubscribe() {
    if (this.isSubscribe) {
      await OneSignal.setSubscription(false);
      await this.syncState();
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
        await this.syncState();
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

  private async syncState() {
    this.supported = await OneSignal.isPushNotificationsSupported();
    this.hasSubscribe = await OneSignal.isPushNotificationsEnabled();
    this.hasOptedOut = await OneSignal.isOptedOut();
  }
}
