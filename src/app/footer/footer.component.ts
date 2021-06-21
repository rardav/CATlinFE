import { Component, OnInit } from '@angular/core';
import { NavbarService } from '../_services/navbar.service';

@Component({
  selector: 'app-footer',
  templateUrl: './footer.component.html',
  styleUrls: ['./footer.component.css']
})
export class FooterComponent implements OnInit {

  constructor(public navService: NavbarService) { 

  }

  ngOnInit(): void {
  }

}
