import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { environment } from 'src/environments/environment';
import { User } from '../_models/user';

@Injectable({
  providedIn: 'root'
})
export class UsersService {
  baseUrl = environment.apiUrl;

  constructor(private http: HttpClient) { }

  getUser(email: string) {
    return this.http.get<User>(this.baseUrl + 'users/' + email);
  }
}