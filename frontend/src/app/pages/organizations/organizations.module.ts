import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { OrganizationsComponent } from './organizations.component';
import { OrgProfileModule } from './org-profile/org-profile.module';
import { OrgMiniDetailModule } from './org-mini-detail/org-mini-detail.module';

@NgModule({
  imports: [
    CommonModule,
    OrgMiniDetailModule,
    OrgProfileModule
  ],
  declarations: [ OrganizationsComponent ],
  exports: [ OrganizationsComponent ]
})

export class OrganizationsModule { }
