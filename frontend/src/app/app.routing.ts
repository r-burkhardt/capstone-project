import { Routes, RouterModule } from '@angular/router';
import {ModuleWithProviders} from "@angular/core/src/core";

export const routes: Routes = [
  {
    path: "",
    loadChildren: "app/"
  },
  {
    path: "player",
    loadChildren: "app/player/player.module#PlayerModule"
  },
  {
    path: "organization",
    loadChildren: "app/organization/organization.module#OrganizationModule"
  }
];

export const routing: ModuleWithProviders = RouterModule.forRoot(routes, {useHash: true});
