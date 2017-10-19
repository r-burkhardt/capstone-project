import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { ModuleWithProviders } from '@angular/core/src/core';

// import { PagesModule } from './pages/pages.module';
import { HomeComponent } from './pages/home/home.component';
import { OrganizationsComponent } from './pages/organizations/organizations.component';
import { PlayersComponent } from './pages/players/players.component';
import { OrgProfileComponent } from './pages/organizations/org-profile/org-profile.component';
import { PlayersProfileComponent } from './pages/players/players-profile/players-profile.component';

const appRoutes: Routes = [
  // { path: '', redirectTo: '/home', pathMatch: 'full' },
  { path: '', component: HomeComponent },
  { path: 'organizations', component: OrganizationsComponent },
  // { path: 'organizations', component: OrganizationsComponent, children: [
  //   { path: ':id', component: OrgProfileComponent}
  // ] },
  { path: 'organizations/:id', component: OrgProfileComponent },
  { path: 'players', component: PlayersComponent },
  { path: 'players/:id', component: PlayersProfileComponent }
];

@NgModule({
  imports: [ RouterModule.forRoot(appRoutes) ], // {useHash: false})],
  exports: [ RouterModule ]
})

export class AppRoutingModule {}

// export const routing: ModuleWithProviders = RouterModule.forRoot(routes, {useHash: true});
