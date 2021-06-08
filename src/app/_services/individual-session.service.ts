import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { environment } from 'src/environments/environment';
import { IndividualSession } from '../_models/individual-session';

@Injectable({
  providedIn: 'root'
})
export class IndividualSessionService {
  baseUrl = environment.apiUrl;

  constructor(private http: HttpClient) { }

  insertIndividualSession(model: any) {
    return this.http.post<IndividualSession>(this.baseUrl + 'individualsessions', model); 
  }

  getIndividualSessions(id: number) {
    return this.http.get<IndividualSession[]>(this.baseUrl + 'users/' + id + '/individualsessions');
  }

  getIndividualSessionsFromSession(id: number) {
    return this.http.get<IndividualSession[]>(this.baseUrl + 'sessions/' + id + '/individualsessions');
  }

  getIdOfIndividualSession(sessionId: number, userId: number) {
    return this.http.get<number>(this.baseUrl + 'sessions/' + sessionId + '/users/' + userId + '/individualsessions/id');
  }




}
