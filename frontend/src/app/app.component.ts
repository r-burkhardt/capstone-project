import { Component, ViewChild } from '@angular/core';
import { HeaderComponent } from './shared/layout/header/header.component';
import { PlayerService, Player } from './core/services/player.service';

@Component({
  selector: 'app-root',
  // template: "<router-outlet></router-outlet>",
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css']
})
export class AppComponent {

  player: Player;
  title = 'Team Builder';

  constructor() {}
}
