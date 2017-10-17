import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { OrganizationsProfileComponent } from './organizations-profile.component';

@NgModule({
  imports: [
    CommonModule,
  ],
  declarations: [ OrganizationsProfileComponent ],
  exports: [ OrganizationsProfileComponent ]
})

export class OrganizationsProfileModule { }
