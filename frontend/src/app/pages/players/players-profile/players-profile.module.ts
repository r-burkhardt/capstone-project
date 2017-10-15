import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { PlayersProfileComponent } from './players-profile.component';

@NgModule({
  imports: [
    CommonModule
  ],
  declarations: [ PlayersProfileComponent ],
  exports: [ PlayersProfileComponent ]
})
export class PlayersProfileModule { }
