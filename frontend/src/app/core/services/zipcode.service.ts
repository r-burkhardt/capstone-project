import { Injectable } from '@angular/core';
import { ApiService } from './api.service';
import { Observable } from 'rxjs';
import { map } from 'rxjs/operators';

@Injectable()
export class ZipcodeService {

  private readonly baseUri = 'v1/zipcode';

  constructor(private apiService: ApiService) {
  }

  getZipcode(zipcode: string): Observable<Zipcode> {
    const uri = this.baseUri + '/' + zipcode;

    const observable = this.apiService.get(uri);

    return observable.pipe(map(response => {
      const data = response;

      return new Zipcode().deserialize(data);
    }));
  }
}

export class Zipcode implements Serializable<Zipcode> {

  id = '';
  zip = '';
  city = '';
  state = '';
  latitude = '';
  longitude = '';

  serialize(): string {
    return JSON.stringify(this);
  }

  deserialize(json) {
    this.id = json.id;
    this.zip = json.zip;
    this.city = json.city;
    this.state = json.state;
    this.latitude = json.latitude;
    this.longitude = json.longitude;

    return this;
  }

  clone(): Zipcode {
    return new Zipcode().deserialize(JSON.parse(JSON.stringify(this)));
  }

  // numToString(zip: number): string {
  //
  // }

}

