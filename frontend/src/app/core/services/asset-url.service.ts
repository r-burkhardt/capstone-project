import { Injectable } from '@angular/core';

@Injectable()
export class AssetUrlService {

  constructor() { }

  getUrl(asset: string) {
    let output = asset;
    if (!location.hostname.startsWith("localhost")) {
      output = asset;
      // output = getAssetUrl(asset);
    }
    return output;
  }
}
