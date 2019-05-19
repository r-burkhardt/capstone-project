import { Injectable } from '@angular/core';
import { ApiService } from './api.service';
import { Observable } from 'rxjs';
import {Zipcode} from './zipcode.service';
import {until} from 'selenium-webdriver';
import { map } from 'rxjs/operators'
import elementIsSelected = until.elementIsSelected;

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

    return observable.pipe(map(response => {
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
    }));
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
  userID = '';
  status = '';
  firstName = '';
  lastName = '';
  email = '';
  phone = '';
  zipcode = '';
  zipcodeObj = new Zipcode();
  latitude = '';
  longitude = '';
  dateOfBirth = '';
  heightFeet = '';
  heightInch = '';
  yearsPlay = '';
  injuries = []; // '';
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
    this.userID = json.userID
    this.status = json.status;
    this.firstName = json.firstName;
    this.lastName = json.lastName;
    this.email = json.email;
    this.phone = json.phone;
    this.zipcode = json.zipcode;
    this.zipcodeObj = new Zipcode();
    this.latitude = json.latitude;
    this.longitude = json.longitude;
    this.dateOfBirth = json.dateOfBirth;
    this.heightFeet = json.heightFeet;
    this.heightInch = json.heightInch;
    this.yearsPlay = json.yearsPlay;
    this.injuries = json.injuries[0] === '' ? [] : json.injuries;
    this.pointAvg = json.pointAvg;
    this.about = json.about ? json.about : '';
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
    const dob = Date.parse(this.dateOfBirth);
    const timeDiff = Math.abs(Date.now() - dob);
    return Math.floor((timeDiff / ( 1000 * 3600 * 24)) / 365 );
  }

  getExperience(): string {
    const timeDiff = Math.abs(Date.now() - Date.parse(this.dateCreated));
    const timeDiffYears = Math.floor((timeDiff / ( 1000 * 3600 * 24 )) / 365 );
    return parseInt(this.yearsPlay, 10) === 5 ? this.yearsPlay + timeDiffYears : this.yearsPlay;
  }

  calculateRank() {
    const age = this.getAge();
    const height = parseFloat(this.heightFeet) + (parseFloat(this.heightInch) / 12);
    const yearsPlay = parseFloat(this.yearsPlay); // parseInt(this.yearsPlay.substring(this.yearsPlay.length - 1), 10);
    const injuryCount = this.injuries.length;
    const pointAvg = parseFloat(this.pointAvg);

    let totalRank: number;

    totalRank = this.getAgeRank(age);
    totalRank += this.getHeightRank(height);
    totalRank += this.getYearsPlayRank(yearsPlay);
    totalRank += this.getInjuryRank(injuryCount);
    totalRank += this.getPointAvg(pointAvg);

    this.totalRank = totalRank.toString();
  }

  private getAgeRank( age: number ): number {
    if ( age <= 20 ) {
      return 5;
    } else if ( age > 20 && age <= 25 ) {
      return 4;
    } else if ( age > 25 && age <= 30 ) {
      return 3;
    } else if ( age > 30 && age <= 35 ) {
      return 2;
    } else if ( age > 35 && age <= 40 ) {
      return 1;
    } else if ( age > 40 && age <= 45 ) {
      return 0;
    } else if ( age > 45 && age <= 50 ) {
      return -1;
    } else if ( age > 50 && age <= 55 ) {
      return -2;
    } else if ( age > 55) {
      return -3;
    } else {
      return 0;
    }
  }

  private getHeightRank( height: number ): number {
    if ( height < 4.5 ) {
      return 0;
    } else if ( height >= 4.5 && height < 5.0 ) {
      return 1;
    } else if ( height >= 5.0 && height < 5.5 ) {
      return 2;
    } else if ( height >= 5.5 && height < 6.0 ) {
      return 3;
    } else if ( height >= 6.0 && height < 6.5 ) {
      return 4;
    } else if ( height >= 6.5 ) {
      return 5;
    } else {
      return 0;
    }
  }

  private getYearsPlayRank( yearsPlay: number ): number {
    if ( yearsPlay < 2 ) {
      return 1;
    } else if ( yearsPlay >= 2 && yearsPlay <= 5 ) {
      return 2;
    } else if ( yearsPlay > 5 ) {
      return 3;
    } else {
      return 0;
    }
  }

  private getInjuryRank( injuryCount: number ): number {
    if ( injuryCount === 1 ) {
      return -1;
    } else if ( injuryCount === 2 ) {
      return -2;
    } else if ( injuryCount === 3 ) {
      return -3;
    } else if ( injuryCount === 4 ) {
      return -4;
    } else if ( injuryCount === 5 ) {
      return -5;
    } else {
      return 0;
    }

}

  private getPointAvg( pointAvg: number ): number {
    return Math.round(pointAvg);
  }


}
