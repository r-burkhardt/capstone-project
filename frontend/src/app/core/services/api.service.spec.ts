import { TestBed, inject } from '@angular/core/testing';

import { TbapiService } from './api.service';

describe('TbapiService', () => {
  beforeEach(() => {
    TestBed.configureTestingModule({
      providers: [TbapiService]
    });
  });

  it('should be created', inject([TbapiService], (service: TbapiService) => {
    expect(service).toBeTruthy();
  }));
});
