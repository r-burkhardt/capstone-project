import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

// import { PagesComponent } from './pages.component';
import { HomeModule } from './home/home.module';
import { OrganizationsModule } from './organizations/organizations.module';
import { PlayersModule } from './players/players.module';

@NgModule({
  imports: [
    CommonModule,
    HomeModule,
    OrganizationsModule,
    PlayersModule
  ],
  // declarations: [ PagesComponent ],
  // exports: [ PagesComponent ]
})

export class PagesModule { }
