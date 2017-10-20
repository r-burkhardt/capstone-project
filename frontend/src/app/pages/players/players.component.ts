import { Component, OnInit } from '@angular/core';
import {Player, PlayerService} from '../../core/services/player.service';

import { Subject } from 'rxjs/Subject';

@Component({
  selector: 'app-players',
  templateUrl: './players.component.html',
  styleUrls: ['./players.component.css']
})
export class PlayersComponent implements OnInit {
  unsubscribe: Subject<void> = new Subject<void>();

  allPlayers: Player[];
  onePlayer: Player;

  constructor( private playerService: PlayerService ) { }

  ngOnInit() {

    const playerParameters = {};
    this.playerService.getAllPlayers(playerParameters)
      .takeUntil(this.unsubscribe)
      .subscribe(players => {
        this.allPlayers = players;
        // console.log(players);
      });
    const playerId = '59c0355f4b10a131a71c3e4b';
    this.playerService.getPlayer(playerId)
      .takeUntil(this.unsubscribe)
      .subscribe(player => {
        this.onePlayer = player;
      });

  }

}
