import { Component, Input, OnInit } from '@angular/core';
import { Exam } from 'src/app/_models/exam';

@Component({
  selector: 'app-exam-card',
  templateUrl: './exam-card.component.html',
  styleUrls: ['./exam-card.component.css']
})
export class ExamCardComponent implements OnInit {
  @Input() exam: Exam;

  constructor() { }

  ngOnInit(): void {
  }

}
