import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { OrganizationsComponent } from './organizations.component';
import { OrgProfileModule } from './org-profile/org-profile.module';
import { OrgMiniDetailModule } from './org-mini-detail/org-mini-detail.module';
import { OrgInfoDetailModule } from './org-info-detail/org-info-detail.module';
import {OrgSearchModule} from './org-search/org-search.module';

@NgModule({
  imports: [
    CommonModule,
    OrgInfoDetailModule,
    OrgMiniDetailModule,
    OrgSearchModule,
    OrgProfileModule
  ],
  declarations: [ OrganizationsComponent ],
  exports: [ OrganizationsComponent ]
})

export class OrganizationsModule { }
