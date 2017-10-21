import { Injectable } from '@angular/core';
import { ApiService } from './api.service';
import { Observable } from 'rxjs/Observable';
import {Zipcode} from './zipcode.service';

@Injectable()
export class PlayerService {

  private readonly baseUri = 'v1/player';

  constructor(private apiService: ApiService) {  }

  getPlayer(id: string): Observable<Player> {
    const uri = this.baseUri + '/' + id;

    const observable  = this.apiService.get(uri);
    // if (this.apiService.isLocal()) {
    //   observable = this.apiService.get(uri);
    // }

    return observable.map(response => {
      const data = response;
      // if (response.result) {
      //   console.log(response);
      //   data = response.result[0];
      // } else {
      //   console.log(response)
      //   data = response[0];
      // }

      // data = response;

      return new Player().deserialize(data);
    });
  }

  getAllPlayers(params): Observable<Player[]> {
    let observable;
    if (this.apiService.isLocal()) {
      const uri = this.baseUri;
      observable = this.apiService.get(uri);
    }

    return observable.map(response => {
      let data = response;
      if (response.result) {
        data = response.result;
      }

      const players = [];
      if (!data.status) {
        data.players.forEach(item => {
          players.push(new Player().deserialize(item));
        })
      }
      return players;
    });
  }

  createPlayer(player: Player): Observable<Player> {
    return null;
  }

  updatePlayer(player: Player): Observable<Player> {
    return null;
  }

  // deletePlayer(player: Player) { }
}

export class Player implements Serializable<Player> {

  id = '';
  userId = '';
  status = '';
  firstName = '';
  lastName = '';
  email = '';
  phone = '';
  zipcode = '';
  zipcodeObj = new Zipcode();
  latitude = '';
  longitude = '';
  birthday = '';
  heightFeet = '';
  heightInch = '';
  yearsPlay = '';
  injuries = '';
  pointAvg = '';
  about = '';
  profilePic = '';

  totalRank = '';
  dateCreated = '';
  dateLastModified = '';


  serialize(): string {
    this.zipcode = this.zipcodeObj.zip;
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
    this.zipcodeObj = new Zipcode();
    this.latitude = json.latitude;
    this.longitude = json.longitude;
    this.birthday = json.birthday;
    this.heightFeet = json.heightFeet;
    this.heightInch = json.heightInch;
    this.yearsPlay = json.yearsPlay;
    this.injuries = json.injuries;
    this.pointAvg = json.pointAvg;
    this.about = json.about;
    this.profilePic = json.profilePic;

    this.totalRank = json.totalRank;
    this.dateCreated = json.dateCreated;
    this.dateLastModified = json.dateLastModified;

    return this;
  }

  clone(): Player {
    return new Player().deserialize(JSON.parse(JSON.stringify(this)));
  }

  getAge(): number {
    const dob = Date.parse(this.birthday);
    const timeDiff = Math.abs(Date.now() - dob);
    return Math.floor((timeDiff / (1000 * 3600 * 24)) / 365);
  }
}
