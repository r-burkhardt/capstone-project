import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { PagesComponent } from './pages.component';
import { HomeModule } from './home/home.module';
import { OrganizationModule } from './organization/organization.module';

@NgModule({
  imports: [
    CommonModule,
    HomeModule,
    OrganizationModule
  ],
  declarations: [ PagesComponent ],
  exports: [ PagesComponent ]
})

export class PagesModule { }
