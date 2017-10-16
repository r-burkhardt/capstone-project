import { Component, OnInit } from '@angular/core';
import {Player} from "../../core/services/player.service";

@Component({
  selector: 'app-players',
  templateUrl: './players.component.html',
  styleUrls: ['./players.component.css']
})
export class PlayersComponent implements OnInit {

  testPlayer: Player;

  constructor() { }

  ngOnInit() {
    this.testPlayer.id = "1234567";
    this.testPlayer.firstName = "John";
    this.testPlayer.lastName = "Smith";
    this.testPlayer.totalRank = "19";
    this.testPlayer.birthday = "1974-08-02";
    this.testPlayer.injuries = "left knee";
    this.testPlayer.yearsPlay = "8";
    this.testPlayer.heightFeet = "5";
    this.testPlayer.heightInch = "8";
    this.testPlayer.zipcode = "95008";
  }

}
