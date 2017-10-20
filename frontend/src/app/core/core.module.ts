import {NgModule, Optional, SkipSelf} from '@angular/core';
import { CommonModule } from '@angular/common';
// import { ApiService } from "./services/api.service";

// Service Imports
import { AssetUrlService } from './services/asset-url.service';
import { PlayerService } from './services/player.service';
import { TeamService } from './services/team.service';
import { ApiService } from './services/api.service';
import { OrganizationService } from './services/organization.service';
import {ZipcodeService} from './services/zipcode.service';

@NgModule({
  imports: [
    CommonModule
  ],
  declarations: [],
  providers: [
    // Services
    ApiService,
    AssetUrlService,
    OrganizationService,
    PlayerService,
    TeamService,
    ZipcodeService
  ]
})
export class CoreModule {
}
