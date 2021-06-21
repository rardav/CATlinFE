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
  subjects: Set<string> = new Set();
  visibleExams: Exam[];
  objectInsideLocalStorage: string;

  constructor(private examsService: ExamsService) { }

  ngOnInit(): void {
    this.loadExams();
  }

  loadExams() {
    this.examsService.getExams().subscribe(exams => {
      this.exams = exams;
      this.visibleExams = exams;

      let sortedSubjects: string[] = [];
      exams.forEach(exam => {
        sortedSubjects.push(exam.subject);
      });
      sortedSubjects.sort();
      sortedSubjects.forEach(subject => {
        this.subjects.add(subject);
      })
    })
  }

  onClick(exam: Exam) {
    this.objectInsideLocalStorage = localStorage.getItem('session_' + exam.urlTitle);
    if (this.objectInsideLocalStorage) {
      let obj = JSON.parse(this.objectInsideLocalStorage);
      let now = new Date();
      if (now.getTime() > new Date(obj.endTime).getTime()) {
        localStorage.removeItem('session_' +  exam.urlTitle);
      }
    }
  }

  onSubjectClick(element){
    this.visibleExams = [];
    if(element.textContent === 'All'){
      this.visibleExams = this.exams;
    } else {
      this.visibleExams = this.exams.filter(exam => exam.subject === element.textContent);
    }

    //style
    if(element.nodeName === "BUTTON") {
      let isButtonAlreadyActive = element.parentElement.querySelector(".active");
      if( isButtonAlreadyActive ) {
        isButtonAlreadyActive.classList.remove("active");
      }
      element.className += " active";
    }
  }

}
