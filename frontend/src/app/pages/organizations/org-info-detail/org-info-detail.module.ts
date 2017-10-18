import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { OrgInfoDetailComponent } from './org-info-detail.component';

@NgModule({
  imports: [
    CommonModule
  ],
  declarations: [ OrgInfoDetailComponent ],
  exports: [ OrgInfoDetailComponent ]
})
export class OrgInfoDetailModule { }
