import { Component, OnInit } from '@angular/core';
import {Player, PlayerService} from '../../core/services/player.service';

import { Subject } from 'rxjs';
import {Zipcode, ZipcodeService} from '../../core/services/zipcode.service';
import {allowPreviousPlayerStylesMerge} from '@angular/animations/browser/src/util';

@Component({
  selector: 'app-players',
  templateUrl: './players.component.html',
  styleUrls: ['./players.component.css']
})
export class PlayersComponent implements OnInit {
  unsubscribe: Subject<void> = new Subject<void>();

  allPlayers: Player[];
  onePlayer: Player;

  constructor(
    private playerService: PlayerService,
    private zipcodeService: ZipcodeService
  ) { }

  ngOnInit() {

    const playerParameters = {};
    this.playerService.getAllPlayers(playerParameters)
      // .takeUntil(this.unsubscribe)
      .subscribe(players => {
        this.allPlayers = players;
        // console.log(this.allPlayers);
        this.allPlayers.forEach( player => {
          this.zipcodeService.getZipcode(player.zipcode)
            // .takeUntil(this.unsubscribe)
            .subscribe(zip => {
              player.zipcodeObj = zip;
            });
        });
      });
    // const playerId = '59c0355f4b10a131a71c3e4b';
    // this.playerService.getPlayer(playerId)
    //   .takeUntil(this.unsubscribe)
    //   .subscribe(player => {
    //     this.onePlayer = player;
    //   });

  }

  // getCityState(zipcode: any): string {
  //   let zip: Zipcode;
  //   this.zipcodeService.getZipcode(zipcode)
  //     .takeUntil(this.unsubscribe)
  //     .subscribe(rtrnZipcode => {
  //       zip = rtrnZipcode;
  //     });
  //   return zip.city + ', ' + zip.state;
  // }

}
