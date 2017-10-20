import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { OrgMiniDetailComponent } from './org-mini-detail.component';
import {RouterModule} from "@angular/router";

@NgModule({
  imports: [
    CommonModule,
    RouterModule
  ],
  declarations: [ OrgMiniDetailComponent ],
  exports: [ OrgMiniDetailComponent ]
})

export class OrgMiniDetailModule { }
