import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { environment } from 'src/environments/environment';
import { Session } from '../_models/session';

@Injectable({
  providedIn: 'root'
})
export class SessionService {
  baseUrl = environment.apiUrl;

  constructor(private http: HttpClient) { }

  getSessionById(id: number) {
    return this.http.get<Session>(this.baseUrl + 'sessions/id/' + id);
  }

  getSessionByAccessKey(accessKey: string) {
    return this.http.get<Session>(this.baseUrl + 'sessions/accesskey/' + accessKey);
  }

  insertSession(model: any) {
    return this.http.post<Session>(this.baseUrl + 'sessions', model); 
  }

  getAccessKeys() {
    return this.http.get<string[]>(this.baseUrl + 'sessions/accesskeys');
  }

  getSessions(id:number) {
    return this.http.get<Session[]>(this.baseUrl + 'users/' + id + '/sessions');
  }

  getIdByAccessKey(accessKey: string) {
    return this.http.get<number>(this.baseUrl + 'sessions/accesskey/' + accessKey + '/properties/id');
  }
}
