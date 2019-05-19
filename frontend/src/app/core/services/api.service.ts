
import {throwError as observableThrowError, Observable} from 'rxjs';
import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders, HttpResponse } from '@angular/common/http';
import { apiConfig } from '../api.config';
import { catchError } from 'rxjs/operators';





@Injectable()
export class ApiService {

  constructor(private http: HttpClient) { }

  public get(uri): Observable<any> {
    return this.http.get(this.getBaseUrl() + '/' + uri, { headers: this.getHeaders() })
      .pipe(catchError(this.handleError));
      // .map(this.handleData)
      // .catch(this.handleError);
  }

  public post(uri: string, body: string): Observable<any> {
    const headers = this.getHeaders();
    headers.append('Content-Type', 'application/json');
    return this.http.post(this.getBaseUrl() + '/' + uri, body, { headers: headers })
      .pipe(catchError(this.handleError));
      // .map(this.handleData)
      // .catch(this.handleError);
  }

  public put(uri: string, body: string): Observable<any> {
    const headers = this.getHeaders();
    headers.append('Content-Type', 'application/json');
    return this.http.put(this.getBaseUrl() + '/' + uri, body, { headers: headers })
      .pipe(catchError(this.handleError));
      // .map(this.handleData)
      // .catch(this.handleError);
  }

  public remoteCall(methodName: string, param: string): Observable<any> {
    // return Observable.create(observer => {
    //   visualforceInvokeAction(/*sfConfig.controller + "." +*/ methodName, param, (response, event) => {
    //     if (event.status) {
    //       if (response.status < 400) {
    //         observer.next(response);
    //         observer.complete();
    //
    //       } else {
    //         observer.error(response.metadata["moreInfo"]);
    //       }
    //
    //     } else {
    //       const message = event.type === "exception" ?
    //         event.message + "\n" + event.where : event.message;
    //
    //       observer.error(message);
    //     }
    //   });
    // });
    return null;
  }

  public isLocal() {
    return location.hostname.startsWith('localhost');
  }

  public resolveParamsToUri(params): string {
    if (params === undefined || params.length === 0) {
      return '';
    }

    let result = '';
    // tslint:disable-next-line:forin
    for (const key in params) {
      result += key + '=' + params[key] + '&';
    }
    return result.substring(0, result.length - 1);
  }

  private getBaseUrl() {
    return apiConfig.restApiUrl;
  }

  private getHeaders(): HttpHeaders {
    // const conn = new jsforce.Connection({
    //   accessToken: apiConfig.accessToken,
    //   instanceUrl: apiConfig.loginServer
    // });
    //
    const headers = new HttpHeaders();
    // headers.append("Authorization", "Bearer " + conn.accessToken);
    return headers;
    // return null;
  }

  private handleData(response: Response) {
    const body = response.json();
    // if (body) {
    //   return body.data || body;
    //
    // } else {
    //   return {};
    // }
  }

  private handleError(error: any) {
    const errorMessage = (error.message) ? error.message :
      error.status ? `${error.status} - ${error.statusText}` : 'Server error';

    // We can optionally log this to somewhere else instead
    console.error(errorMessage);

    const body = error.json();
    if (body['moreInfo']) {
      console.error('More Info: ', body['moreInfo']);
    }

    return observableThrowError(error);
  }
}
