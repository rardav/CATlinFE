import { Component, OnInit } from '@angular/core';
import { Exam } from 'src/app/_models/exam';
import { ExamsService } from 'src/app/_services/exams.service';

@Component({
  selector: 'app-exam-list',
  templateUrl: './exam-list.component.html',
  styleUrls: ['./exam-list.component.css']
})
export class ExamListComponent implements OnInit {
  exams: Exam[];

  constructor(private examsService: ExamsService) { }

  ngOnInit(): void {
    this.loadExams();
  }

  loadExams() {
    this.examsService.getExams().subscribe(exams => {
      this.exams = exams;
    })
  }

}
