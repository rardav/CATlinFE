import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'app-home',
  templateUrl: './home.component.html',
  styleUrls: ['./home.component.css']
})
export class HomeComponent implements OnInit {

  constructor() { }

  ngOnInit(): void {
    if (localStorage.getItem('currentIndividualSession') !== null) {
      localStorage.removeItem('currentIndividualSession');
    }
  }
}
