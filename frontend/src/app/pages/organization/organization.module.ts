import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { OrganizationComponent } from './organization.component';

@NgModule({
  imports: [
    CommonModule,
  ],
  declarations: [ OrganizationComponent ],
  exports: [ OrganizationComponent ]
})

export class OrganizationModule { }
