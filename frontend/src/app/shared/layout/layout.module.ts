import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import {HeaderModule} from "./header/header.module";
import {MenuModule} from "./menu/menu.module";
import { LayoutComponent } from './layout.component';

@NgModule({
  imports: [
    CommonModule,
    HeaderModule,
    MenuModule
  ],
  declarations: [
  LayoutComponent],
  exports: [
    HeaderModule,
    MenuModule,
  ]
})
export class LayoutModule { }
