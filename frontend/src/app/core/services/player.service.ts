import { Injectable } from '@angular/core';
import { ApiService } from "./api.service";
import { Observable } from "rxjs/Observable";

@Injectable()
export class PlayerService {

  private readonly baseUri = "v1/players";

  constructor(private apiService: ApiService) {  }

  getPlayer(id: string): Observable<Player> {
    const uri = this.baseUri + "/" + id;

    let observable;
    if (this.apiService.isLocal()) {
      observable = this.apiService.get(uri);
    } else {
      const json = { ids: id };
      observable = this.apiService.remoteCall("getPlayers", JSON.stringify(json));
    }

    return observable.map(response => {
      let data;
      if (response.result) {
        data = response.result[0];
      } else {
        data = response[0];
      }

      return new Player().deserialize(data);
    });
  }

  getAllPlayers(params): Observable<Player[]> {
    let observable;
    if (this.apiService.isLocal()) {
      const uri = this.baseUri + (params === undefined ? "" : "?" + this.apiService.resolveParamsToUri(params));
      observable = this.apiService.get(uri);
    } else {
      observable = this.apiService.remoteCall("getPlayers", JSON.stringify(params));
    }

    return observable.map(response => {
      let data = response;
      if (response.result) {
        data = response.result;
      }

      const players = [];
      if (!data.status) {
        data.forEach(item => {
          players.push(new Player().deserialize(item));
        });
      }
      return players;
    });
  }
}

export class Player implements Serializable<Player> {

  id = "";
  userId = "";
  status = "";
  firstName = "";
  lastName = "";
  email = "";
  phone = "";
  zipcode = "";
  latitude = "";
  longitude = "";
  // organizationId = "";
  birthday = "";
  heightFeet = "";
  heightInch = "";
  yearsPlay = "";
  injuries = "";
  pointAvg = "";

  totalRank = "";
  // ageRank = "";
  // heightRank = "";
  // yrsPlayRank = "";
  // skillRank = "";
  // injuryRank = "";


  serialize(): string {
    return JSON.stringify(this);
  }

  deserialize(json) {
    this.id = json.id;
    this.userId = json.userId
    this.status = json.status;
    this.firstName = json.firstName;
    this.lastName = json.lastName;
    this.email = json.email;
    this.phone = json.phone;
    this.zipcode = json.zipcode;
    this.latitude = json.latitude;
    this.longitude = json.longitude;
    // this.organizationId = json.organizationId;
    this.birthday = json.birthday;
    this.heightFeet = json.heightFeet;
    this.heightInch = json.heightInch;
    this.yearsPlay = json.yearsPlay;
    this.injuries = json.injuries;
    this.pointAvg = json.pointAvg;

    this.totalRank = json.totalRank;
    // this.ageRank = json.ageRank;
    // this.heightRank = json.heightRank;
    // this.yrsPlayRank = json.yrsPlayRank;
    // this.skillRank = json.skillRank;
    // this.injuryRank = json.injuryRank;

    return this;
  }

  clone(): Player {
    return new Player().deserialize(JSON.parse(JSON.stringify(this)));
  }
}
