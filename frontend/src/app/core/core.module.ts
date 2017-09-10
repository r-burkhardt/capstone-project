import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import {AssetUrlService} from "./services/asset-url.service";
import {PlayerService} from "./services/player.service";
import {TeamService} from "./services/team.service";

@NgModule({
  imports: [
    CommonModule
  ],
  declarations: [],
  providers: [
    AssetUrlService,
    PlayerService,
    TeamService
  ]
})
export class CoreModule { }
