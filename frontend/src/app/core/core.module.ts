import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import {AssetUrlService} from "./services/asset-url.service";

@NgModule({
  imports: [
    CommonModule
  ],
  declarations: [],
  providers: [
    AssetUrlService
  ]
})
export class CoreModule { }
