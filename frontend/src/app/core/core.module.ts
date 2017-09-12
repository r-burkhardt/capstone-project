import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

// Service Imports
import {AssetUrlService} from './services/asset-url.service';
import {PlayerService} from './services/player.service';
import {TeamService} from './services/team.service';

@NgModule({
  imports: [
    CommonModule
  ],
  declarations: [],
  providers: [
    // Services
    AssetUrlService,
    PlayerService,
    TeamService
  ]
})
export class CoreModule { }
