import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { MenuComponent } from './menu.component';
import { RouterModule } from "@angular/router";
import { ROUTER_PROVIDERS } from "@angular/router/src/router_module";

@NgModule({
  imports: [
    CommonModule,
    RouterModule
  ],
  declarations: [ MenuComponent ],
  exports: [ MenuComponent ],
  // providers: [ ROUTER_PROVIDERS ]
})
export class MenuModule { }
