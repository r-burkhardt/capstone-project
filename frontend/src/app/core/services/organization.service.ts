import { Injectable } from '@angular/core';
import { ApiService } from "./api.service";
import { Observable } from "rxjs/Observable";

@Injectable()
export class OrganizationService {

  private readonly baseUri = "v1/organizations";

  constructor(private apiService: ApiService) { }

  getOrganization(id: string): Observable<Organization> {
    const uri = this.baseUri + "/" + id;

    let observable;
    if (this.apiService.isLocal()) {
      observable = this.apiService.get(uri);
    } else {
      const json = { ids: id };
      observable = this.apiService.remoteCall("getOrganizations", JSON.stringify(json));
    }

    return observable.map(response => {
      let data;
      if (response.result) {
        data = response.result[0];
      } else {
        data = response[0];
      }

      return new Organization().deserialize(data);
    });
  }

  getAllOrganizations(params): Observable<Organization[]> {
    let observable;
    if (this.apiService.isLocal()) {
      const uri = this.baseUri + (params === undefined ? "" : "?" + this.apiService.resolveParamsToUri(params));
      observable = this.apiService.get(uri);
    } else {
      observable = this.apiService.remoteCall("getOrganizations", JSON.stringify(params));
    }

    return observable.map(response => {
      let data = response;
      if (response.result) {
        data = response.result;
      }

      const organizations = [];
      if (!data.status) {
        data.forEach(item => {
          organizations.push(new Organization().deserialize(item));
        });
      }
      return organizations;
    });
  }
}

export class Organization implements Serializable<Organization> {

  id = "";

  serialize(): string {
    return JSON.stringify(this);
  }

  deserialize(json) {
    this.id  = json.id;

    return this;
  }

  clone(): Organization {
    return new Organization().deserialize(JSON.parse(JSON.stringify(this)));
  }
}
