import { NgModule } from '@angular/core';
import {RouterModule, Routes} from '@angular/router';
import {OrgInfoDetailComponent} from "./org-info-detail/org-info-detail.component";
import {OrgMiniDetailComponent} from "./org-mini-detail/org-mini-detail.component";

const routes: Routes = [
  { path: '', component: OrgInfoDetailComponent },
  { path: ':id', component: OrgMiniDetailComponent }
];

@NgModule({
  imports: [ RouterModule.forChild(routes) ],
  exports: [ RouterModule ]
})
export class OrganizationsRouting { }
