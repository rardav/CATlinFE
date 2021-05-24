import { Component, OnInit } from '@angular/core';
import { NavbarService } from 'src/app/_services/navbar.service';

@Component({
  selector: 'app-exam-in-progress',
  templateUrl: './exam-in-progress.component.html',
  styleUrls: ['./exam-in-progress.component.css']
})
export class ExamInProgressComponent implements OnInit {

  constructor(public navService: NavbarService) { }

  ngOnInit(): void {
    this.navService.hide();
  }

  stopTest() {
    this.navService.show();
  }

}
