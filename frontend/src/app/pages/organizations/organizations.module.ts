import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { OrganizationsComponent } from './organizations.component';
import {OrganizationsProfileModule} from "./organizations-profile/organizations-profile.module";

@NgModule({
  imports: [
    CommonModule,
    OrganizationsProfileModule
  ],
  declarations: [ OrganizationsComponent ],
  exports: [ OrganizationsComponent ]
})

export class OrganizationsModule { }
