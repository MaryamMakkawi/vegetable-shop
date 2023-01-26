import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { environment } from 'src/environments/environment';

@Injectable({
  providedIn: 'root',
})
export class ApiService {
  constructor(private httpClient: HttpClient) {}

  post(path: string, data: any, option?: any) {
    return this.httpClient.post(
      `${environment.firebase.databaseURL}/${path}.json`,
      data,
      option
    );
  }

  put(path: string, data: any, option?: any) {
    return this.httpClient.put(
      `${environment.firebase.databaseURL}/${path}.json`,
      data,
      option
    );
  }

  get(path: string) {
    return this.httpClient.get(
      `${environment.firebase.databaseURL}/${path}.json`
    );
  }

  delete(path: string, option?: any) {
    return this.httpClient.delete(
      `${environment.firebase.databaseURL}/${path}.json`,
      option
    );
  }
}
