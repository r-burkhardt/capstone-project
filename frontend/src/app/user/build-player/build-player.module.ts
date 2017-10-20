import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { BuildPlayerComponent } from './build-player.component';

@NgModule({
  imports: [
    CommonModule
  ],
  declarations: [ BuildPlayerComponent ],
  exports: [ BuildPlayerComponent ],
})
export class BuildPlayerModule { }
