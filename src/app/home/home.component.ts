import { Component, OnInit } from '@angular/core';
import { Observable } from 'rxjs';
import { User } from '../_models/user';
import { AccountService } from '../_services/account.service';

@Component({
  selector: 'app-home',
  templateUrl: './home.component.html',
  styleUrls: ['./home.component.css']
})
export class HomeComponent implements OnInit {
  currentUser$: Observable<User>
  user: User;

  constructor(private accountService: AccountService) { }

  ngOnInit(): void {
    if (localStorage.getItem('currentIndividualSession') !== null) {
      localStorage.removeItem('currentIndividualSession');
    }
    this.loadCurrentUser();
  }

  loadCurrentUser(){
    this.currentUser$ = this.accountService.currentUser$;
    this.currentUser$.subscribe(user => {
      if (!!user) {
        this.user = user;
      }
    });
  }
}
