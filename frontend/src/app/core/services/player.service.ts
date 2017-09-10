import { Injectable } from '@angular/core';

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
  organizationId = "";
  birthday = "";
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
    this.status = json.status;
    this.firstName = json.firstName;
    this.lastName = json.lastName;
    this.email = json.email;
    this.phone = json.phone;
    this.zipCode = json.zipCode;
    this.organizationId = json.organizationId;
    this.birthday = json.birthday;
    this.height = json.height;
    this.yrsPlay = json.yrsPlay;
    this.injuries = json.injuries;
    this.pointAvg = json.pointAvg;

    this.totalRank = json.totalRank;
    this.ageRank = json.ageRank;
    this.heightRank = json.heightRank;
    this.yrsPlayRank = json.yrsPlayRank;
    this.skillRank = json.skillRank;
    this.injuryRank = json.injuryRank;

    return this;
  }

  clone(): Player {
    return new Player().deserialize(JSON.parse(JSON.stringify(this)));
  }


}
