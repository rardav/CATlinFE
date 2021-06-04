import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { Observable } from 'rxjs';
import { Exam } from 'src/app/_models/exam';
import { User } from 'src/app/_models/user';
import { AccountService } from 'src/app/_services/account.service';
import { ExamsService } from 'src/app/_services/exams.service';

@Component({
  selector: 'app-exam-detail',
  templateUrl: './exam-detail.component.html',
  styleUrls: ['./exam-detail.component.css']
})
export class ExamDetailComponent implements OnInit {
  exam: Exam;
  currentUser$: Observable<User>;
  startedTest: boolean = false;
  accesskey: string;
  isSupervisor: boolean = true;

  constructor(private examService: ExamsService, 
    private route: ActivatedRoute, 
    private accountService: AccountService,
    private router: Router) {}

  ngOnInit(): void {
    this.getCurrentUser();
    this.loadExam();
  }

  loadExam() {
    this.examService.getExam(this.route.snapshot.paramMap.get('title')).subscribe(exam => {
      this.exam = exam;
    })
  }

  private getCurrentUser() {
    this.currentUser$ = this.accountService.currentUser$;
  }

  advanceToTest() {
    this.startedTest = true;
  }

  advanceToSessionBeginning() {
    this.accesskey = this.generateAccessKey(6);
    this.startedTest = true;
  }

  startTest(){
    this.examService.currentExam = this.exam;
    this.router.navigateByUrl('/catalogue/' + this.exam.urlTitle + '/in-progress');
  }

  generateAccessKey(length: number) {
    var result           = [];
    var characters       = 'ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz0123456789';
    var charactersLength = characters.length;
    for ( var i = 0; i < length; i++ ) {
      result.push(characters.charAt(Math.floor(Math.random() * 
 charactersLength)));
   }
   return result.join('');
}

}
