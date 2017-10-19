import { Component, OnInit } from '@angular/core';
import {Player, PlayerService} from '../../core/services/player.service';

import { Subject } from 'rxjs/Subject';

@Component({
  selector: 'app-players',
  templateUrl: './players.component.html',
  styleUrls: ['./players.component.css']
})
export class PlayersComponent implements OnInit {
  // unsubscribe: Subject<void> = new Subject<void>();

  // allPlayers: Player[];

  // constructor( private playerService: PlayerService ) { }
  constructor(  ) { }

  ngOnInit() {

    const playerParameters = {};
    // this.playerService.getAllPlayers(playerParameters)
    //   .takeUntil(this.unsubscribe)
    //   .subscribe(players => {
    //     this.allPlayers = players;
    //     console.log(players);
    //   });
  }

}
