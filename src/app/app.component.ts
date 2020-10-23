import { Component } from '@angular/core';
import { OneSignalService } from 'ngx-onesignal';
import { BehaviorSubject } from 'rxjs';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css'],
})
export class AppComponent {
  private readonly tagsSubscribe$ = new BehaviorSubject<{
    [key: string]: string;
  }>({});
  public readonly tags$ = this.tagsSubscribe$.asObservable();

  constructor(public readonly onesignal: OneSignalService) {
    (window as any).ngxOnesignal = this.onesignal;
  }

  onSubscribe() {
    this.onesignal.subscribe();
  }

  onUnSubscribe() {
    this.onesignal.unsubscribe();
  }

  testPush() {
    this.onesignal.push([
      'sendTag',
      'random',
      Math.random(),
      tagsSent => {
        console.log('tagsSent', tagsSent);
      },
    ]);
  }

  getTags() {
    this.onesignal.push([
      'getTags',
      tags => {
        this.tagsSubscribe$.next(tags);
      },
    ]);
  }
}
