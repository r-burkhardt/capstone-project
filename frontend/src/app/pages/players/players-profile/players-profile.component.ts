import { Component, OnInit } from '@angular/core';
import { Player } from '../../../core/services/player.service';

@Component({
  selector: 'app-players-profile',
  templateUrl: './players-profile.component.html',
  styleUrls: ['./players-profile.component.css']
})
export class PlayersProfileComponent implements OnInit {

  testPlayer: Player;

  constructor() {
    this.testPlayer = new Player();
    this.testPlayer.id = '1234567';
    this.testPlayer.firstName = 'John';
    this.testPlayer.lastName = 'Smith';
    this.testPlayer.totalRank = '19';
    this.testPlayer.birthday = '1974-08-02';
    this.testPlayer.injuries = 'left knee';
    this.testPlayer.pointAvg = '6.3429';
    this.testPlayer.yearsPlay = '8';
    this.testPlayer.heightFeet = '5';
    this.testPlayer.heightInch = '8';
    this.testPlayer.zipcode = '95008';
    this.testPlayer.about = 'Played basketball at Sanford for 4 season and was the starting center for 3 seasons.'
    console.log(this.testPlayer);
  }

  ngOnInit() {
  }

  // getAge(birthday: string): string {
  //
  //   return "43";
  // }

}
