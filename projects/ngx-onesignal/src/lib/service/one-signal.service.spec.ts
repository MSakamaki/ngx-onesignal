import { TestBed } from '@angular/core/testing';

import { OneSignalService } from './one-signal.service';
import { OneSignalOptions } from '../interface';

describe('OneSignalService', () => {
  beforeEach(() => {
    TestBed.configureTestingModule({
      providers: [
        OneSignalService,
        {
          provide: OneSignalOptions,
          useValue: {},
        },
      ],
    });
  });

  it('should be created', () => {
    const service: OneSignalService = TestBed.get(OneSignalService);
    expect(service).toBeTruthy();
  });
});
