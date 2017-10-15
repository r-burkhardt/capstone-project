import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { ModuleWithProviders } from '@angular/core/src/core';

// import { PagesModule } from './pages/pages.module';
import { HomeComponent } from './pages/home/home.component';
import { OrganizationComponent } from './pages/organization/organization.component';

const routes: Routes = [
  { path: '', redirectTo: '/home', pathMatch: 'full' },
  { path: 'home', component: HomeComponent }, // loadChildren: 'app/pages/home/home.module#HomeModule' }, //component: HomeComponent },
  // { path: 'organization', component: OrganizationComponent } // loadChildren: 'app/pages/organization/organization.module#OrganizationModule' } //component: OrganizationComponet },
];

@NgModule({
  imports: [ RouterModule.forRoot(routes) ], // , {useHash: true})],
  exports: [ RouterModule ]
})

export class AppRoutingModule {}

// export const routing: ModuleWithProviders = RouterModule.forRoot(routes, {useHash: true});
