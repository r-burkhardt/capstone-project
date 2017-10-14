import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { PagesComponent } from './pages.component';
import { HomeComponent } from './home/home.component';
import {OrganizationComponent} from './organization/organization.component';

const routes: Routes = [
  {
    // path: "",
    // loadChildren: "pages/home/home.module#HomeModule",
    path: "",
    component: HomeComponent
    // children: [
    //   { path: "", redirectTo: 'home', pathMatch: 'full'},
    //   { path: "organization", component: OrganizationComponent }
    // ]
  }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})

export class PagesRoutingModule {}
