import { TestBed } from '@angular/core/testing';

import { OneSingalService } from './one-singal.service';
import { OneSignalOptions } from '../one-singal.module';

describe('OneSingalService', () => {
  beforeEach(() => {
    TestBed.configureTestingModule({
      providers: [
        OneSingalService,
        {
          provide: OneSignalOptions,
          useValue: {},
        },
      ],
    });
  });

  it('should be created', () => {
    const service: OneSingalService = TestBed.get(OneSingalService);
    expect(service).toBeTruthy();
  });
});
