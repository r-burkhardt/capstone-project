import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { PlayersComponent } from './players.component';
import { PlayersProfileModule } from './players-profile/players-profile.module';

@NgModule({
  imports: [
    CommonModule,
    PlayersProfileModule
  ],
  declarations: [ PlayersComponent ],
  exports: [ PlayersComponent ]
})

export class PlayersModule { }
