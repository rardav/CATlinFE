import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { ReplaySubject } from 'rxjs';
import { map } from 'rxjs/operators';
import { environment } from 'src/environments/environment';
import { User } from '../_models/user';
import { UsersService } from './users.service';

@Injectable({
  providedIn: 'root'
})
export class AccountService {
  baseUrl = environment.apiUrl;
  private currentUserSource = new ReplaySubject<User>(1);
  currentUser$ = this.currentUserSource.asObservable();
  user: User;

  constructor(private http: HttpClient,
    private userService: UsersService) {

  }

  login(model: any) {
    return this.http.post(this.baseUrl + 'account/login', model).pipe(
      map((response: User) => {
        this.user = response;
        if (this.user) {
          localStorage.setItem('user', JSON.stringify(this.user));
          this.currentUserSource.next(this.user);
          this.loadUser(this.user.email);
        }
      })
    );
  }

  register(model: any) {
    return this.http.post(this.baseUrl + 'account/register', model);
  }

  setCurrentUser(user: User) {
    this.currentUserSource.next(user);
  }

  logout() {
    localStorage.removeItem('user');
    this.currentUserSource.next(null);
  }

  loadUser(email: string) {
    this.userService.getUserByEmail(email).subscribe(user => {
      this.user = user;
      localStorage.setItem('userData', JSON.stringify(user));
    })

  }
}
