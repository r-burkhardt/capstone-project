import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { ModuleWithProviders } from '@angular/core/src/core';

// import { PagesModule } from './pages/pages.module';
import { HomeComponent } from './pages/home/home.component';
import { OrganizationsComponent } from './pages/organizations/organizations.component';
import { PlayersComponent } from './pages/players/players.component';

const routes: Routes = [
  // { path: '', redirectTo: '/home', pathMatch: 'full' },
  { path: '', component: HomeComponent },
  { path: 'organizations', component: OrganizationsComponent },
  { path: 'players', component: PlayersComponent }
];

@NgModule({
  imports: [ RouterModule.forRoot(routes) ], // , {useHash: true})],
  exports: [ RouterModule ]
})

export class AppRoutingModule {}

// export const routing: ModuleWithProviders = RouterModule.forRoot(routes, {useHash: true});
