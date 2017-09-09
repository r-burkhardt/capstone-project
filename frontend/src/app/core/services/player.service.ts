import { Injectable } from '@angular/core';
import {Serializable} from "selenium-webdriver";

@Injectable()
export class PlayerService {

  constructor() {  }

}

export class Player implements Serializable<Player> {

  id = "";
  status = "";
  firstName = "";
  lastName = "";
  email = "";
  phone = "";
  zipCode = "";
  organization = "";
  age = "";
  height = "";
  yrsPlay = "";
  injuries = "";
  pointAvg = "";

  totalRank = "";
  ageRank = "";
  heightRank = "";
  yrsPlayRank = "";
  skillRank = "";
  injuryRank = "";


  serialize(): string {
    return JSON.stringify(this);
  }

  deserialize(json) {
    this.id = json.id;
    this.firstName = json.firstName;
    this.lastName = json.lastName;
    this.email = json.email;
    this.phone = json.phone;
    this.zipCode = json.zipCode;
    this.organization = json.organization;
    this.age = json.age;
    this.height = json.height;
    this.yrsPlay = json.yrsPlay;
    this.injuries = json.injuries;
    this.pointAvg = json.pointAvg;

    this.totalRank = json.totalRank;

    return this;
  }

  clone(): Player {
    return new Player().deserialize(JSON.parse(JSON.stringify(this)));
  }


}
