import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { OrgProfileComponent } from './org-profile.component';

@NgModule({
  imports: [
    CommonModule,
  ],
  declarations: [ OrgProfileComponent ],
  exports: [ OrgProfileComponent ]
})

export class OrgProfileModule { }
