import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { OrgSearchComponent } from './org-search.component';

@NgModule({
  imports: [
    CommonModule
  ],
  declarations: [OrgSearchComponent],
  exports: [ OrgSearchComponent ]
})
export class OrgSearchModule { }
