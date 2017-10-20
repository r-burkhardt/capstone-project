import { TestBed, inject } from '@angular/core/testing';

import { ZipcodeService } from './zipcode.service';

describe('ZipcodeService', () => {
  beforeEach(() => {
    TestBed.configureTestingModule({
      providers: [ZipcodeService]
    });
  });

  it('should be created', inject([ZipcodeService], (service: ZipcodeService) => {
    expect(service).toBeTruthy();
  }));
});
