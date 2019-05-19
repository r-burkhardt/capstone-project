import { Component, OnInit, OnDestroy } from '@angular/core';
import { Player, PlayerService } from '../../../core/services/player.service';
import { Zipcode, ZipcodeService } from '../../../core/services/zipcode.service';

import { Subject } from 'rxjs';
import {ActivatedRoute} from '@angular/router';

@Component({
  selector: 'app-players-profile',
  templateUrl: './players-profile.component.html',
  styleUrls: ['./players-profile.component.css']
})
export class PlayersProfileComponent implements OnInit, OnDestroy {
  unsubscribe: Subject<void> = new Subject<void>();

  // testPlayer: Player;
  player: Player;
  profilePic;
  zipcode: Zipcode;

  constructor(
    private playerService: PlayerService,
    private zipcodeService: ZipcodeService,
    private route: ActivatedRoute
  ) {}

  ngOnInit() {
    this.route.params.subscribe(params => {
      this.getPlayer(params['id']);
    });
    // this.getPlayer('59bea0e3df42e0e6c51d8b8d');
  }

  ngOnDestroy() {
    // Prevent memory leak
    // See https://stackoverflow.com/questions/38008334/angular-rxjs-when-should-i-unsubscribe-from-subscription
    this.unsubscribe.next();
    this.unsubscribe.complete();
  }

  getPlayer(id: string) {
    this.playerService.getPlayer(id)
      // .takeUntil(this.unsubscribe)
      .subscribe(player => {
        this.player = player;
        this.player.calculateRank();
        this.profilePic = player.profilePic;
        this.zipcodeService.getZipcode(this.player.zipcode)
          // .takeUntil(this.unsubscribe)
          .subscribe(zipcode => {
            this.player.zipcodeObj = zipcode;
          });
      });
  }

}
