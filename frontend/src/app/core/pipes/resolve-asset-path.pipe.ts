import { Pipe, PipeTransform } from '@angular/core';
import {AssetUrlService} from "../services/asset-url.service";

/**
 * Resolve the given asset to the correct path.
 * Usage:
 *    value  |  resolveAssetPath
 * Example:
 *    {{ "assets/image/logo.png"  |  resolveAssetPath }}
 *    output: "assets/image/logo.png"
 *
 */

@Pipe({
  name: 'resolveAssetPath'
})
export class ResolveAssetPathPipe implements PipeTransform {

  constructor( private assetUrlService: AssetUrlService) {}

  transform(value: any): any {
    return this.assetUrlService.getUrl(value);
  }

}
