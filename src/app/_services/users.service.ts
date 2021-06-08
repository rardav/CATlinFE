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

  getUserByEmail(email: string) {
    return this.http.get<User>(this.baseUrl + 'users/email/' + email);
  }

  getUserById(id: number) {
    return this.http.get<User>(this.baseUrl + 'users/id/' + id);
  }

  getId(email: string) {
    return this.http.get<number>(this.baseUrl + 'users/' + email + '/properties/id');
  }
}
