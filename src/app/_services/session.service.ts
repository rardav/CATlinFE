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

  getSession(id: number) {
    return this.http.get<Session>(this.baseUrl + 'sessions/' + id);
  }
}
