import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import {HeaderModule} from "./header/header.module";
import {MenuModule} from "./menu/menu.module";

@NgModule({
  imports: [
    CommonModule,
    HeaderModule,
    MenuModule
  ],
  declarations: [
  ]
})
export class LayoutModule { }
