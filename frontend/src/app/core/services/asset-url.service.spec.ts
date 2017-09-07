import { TestBed, inject } from '@angular/core/testing';

import { AssetUrlService } from './asset-url.service';

describe('AssetUrlService', () => {
  beforeEach(() => {
    TestBed.configureTestingModule({
      providers: [AssetUrlService]
    });
  });

  it('should be created', inject([AssetUrlService], (service: AssetUrlService) => {
    expect(service).toBeTruthy();
  }));
});
