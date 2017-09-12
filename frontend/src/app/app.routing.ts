import { Routes, RouterModule } from '@angular/router';

export const routes: Routes = [
  {
    path: "",
    loadChildren: "app/"
  },
  {
    path: "player",
    loadChildren: "app/player/lplayer.module#PlayerModule"
  },
  {
    path: "organization",
    loadChildren: "app/organization/organization.module#OrganizationModule"
  }
];
