import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { HeaderModule } from './header/header.module';
import { MenuModule } from './menu/menu.module';
import { RouterModule } from '@angular/router';

@NgModule({
  imports: [
    CommonModule,
    RouterModule,
    HeaderModule,
    MenuModule
  ],
  declarations: [  ],
  exports: [
    HeaderModule,
    MenuModule
  ]
})

export class LayoutModule { }
