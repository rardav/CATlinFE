import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { Router } from '@angular/router';
import { ToastrService } from 'ngx-toastr';
import { Observable } from 'rxjs';
import { User } from '../_models/user';
import { AccountService } from '../_services/account.service';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.css']
})
export class LoginComponent implements OnInit {
  model: any = {}
  loginForm: FormGroup;
  validationErrors: string[] = [];

  constructor(
    private accountService: AccountService, 
    private router: Router, 
    private toastr: ToastrService,
    private formBuilder: FormBuilder) { }

  ngOnInit(): void {
    this.initializeForm();
  }

  initializeForm() {
    this.loginForm = this.formBuilder.group({
      email: ['', Validators.required],
      password: ['', Validators.required],
    })
  }

  login() {
    this.accountService.login(this.loginForm.value).subscribe(response => {
      this.router.navigateByUrl('/')
    }, error => {
      console.log(error);
    })
  }
}
