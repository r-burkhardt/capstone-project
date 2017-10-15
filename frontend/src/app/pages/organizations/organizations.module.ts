import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { OrganizationsComponent } from './organizations.component';

@NgModule({
  imports: [
    CommonModule,
  ],
  declarations: [ OrganizationsComponent ],
  exports: [ OrganizationsComponent ]
})

export class OrganizationsModule { }
