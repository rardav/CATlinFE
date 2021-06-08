import { Component, OnInit } from '@angular/core';
import { Observable } from 'rxjs';
import { User } from '../_models/user';
import { AccountService } from '../_services/account.service';
import { NavbarService } from '../_services/navbar.service';
import { UsersService } from '../_services/users.service';

@Component({
  selector: 'app-nav',
  templateUrl: './nav.component.html',
  styleUrls: ['./nav.component.css']
})
export class NavComponent implements OnInit {
  model: any = {}
  user: User;
  currentUser$: Observable<User>

  constructor(public accountService: AccountService, 
    private userService: UsersService,
    public navService: NavbarService) { }

  ngOnInit(): void {
    this.getCurrentUserData();
  }

  private getCurrentUserData() {
    this.currentUser$ = this.accountService.currentUser$;
    this.currentUser$.subscribe(user => {
      if (!!user) {
        this.loadUser(user.email);
      }
    });
  }

  loadUser(email: string) {
    this.userService.getUserByEmail(email).subscribe(user => {
      this.user = user;
    })
  }
}
