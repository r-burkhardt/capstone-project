import { Routes, RouterModule } from '@angular/router';

export const routes: Routes = [
  {
    path: "player",
    loadChildren: "app/player.module#PlayerModule"
  },
  {
    path: "organization",
    loadChildren: "app/organization.module#OrganizationModule"
  }
];
