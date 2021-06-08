import { formatDate } from '@angular/common';
import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import * as moment from 'moment';
import { Observable } from 'rxjs';
import { map } from 'rxjs/operators';
import { Exam } from 'src/app/_models/exam';
import { Session } from 'src/app/_models/session';
import { SessionForStorage } from 'src/app/_models/session-storage';
import { User } from 'src/app/_models/user';
import { AccountService } from 'src/app/_services/account.service';
import { ExamsService } from 'src/app/_services/exams.service';
import { QuestionsService } from 'src/app/_services/questions.service';
import { SessionService } from 'src/app/_services/session.service';
import { UsersService } from 'src/app/_services/users.service';

@Component({
  selector: 'app-exam-detail',
  templateUrl: './exam-detail.component.html',
  styleUrls: ['./exam-detail.component.css']
})
export class ExamDetailComponent implements OnInit {
  exam: Exam;
  examId: number;
  currentUser$: Observable<User>;
  startedTest: boolean = false;
  accesskey: string;
  examineeAccessKey: string;
  supervisorName: string;
  numberOfQuestions: number;
  selectedLength: number;
  startTime: Date;
  endTime: Date;
  openedSessionDatabase: Session;
  openedSessionLocalStorage: SessionForStorage;
  userId: number;
  objectInsideLocalStorage: string;

  constructor(private examService: ExamsService,
    private route: ActivatedRoute,
    private accountService: AccountService,
    private router: Router,
    private questionService: QuestionsService,
    private userService: UsersService,
    private sessionService: SessionService) { }

  ngOnInit(): void {
    this.objectInsideLocalStorage = localStorage.getItem('session_' + this.route.snapshot.paramMap.get('title'));
    if (this.objectInsideLocalStorage) {
      this.openedSessionLocalStorage = JSON.parse(this.objectInsideLocalStorage);
    }

    this.getCurrentUserData();
    this.loadExam();
    this.loadExamId();
  }

  loadExam() {
    this.examService.getExam(this.route.snapshot.paramMap.get('title')).subscribe(exam => {
      this.exam = exam;
    })
  }

  loadExamId() {
    this.examService.getExamIdByTitle(this.route.snapshot.paramMap.get('title')).subscribe(id => {
      this.examId = id;
      this.loadQuestions(id);
    })
  }

  loadQuestions(id: number) {
    this.questionService.getQuestionsFromQuestionnaire(id).subscribe(questions => {
      this.numberOfQuestions = questions.length;
    })
  }

  private getCurrentUserData() {
    this.currentUser$ = this.accountService.currentUser$;
    this.currentUser$.subscribe(currUser => {
      if (!!currUser) {
        this.loadUserId(currUser.email);
      }
    })
  }

  loadUserId(email: string) {
    this.userService.getId(email).subscribe(id => {
      this.userId = id;
    })
  }

  advanceToTest() {
    this.sessionService.getSessionByAccessKey(this.examineeAccessKey).subscribe(session => {
      if (session.questionnaireId !== 0) {
        this.sessionService.getIdByAccessKey(this.examineeAccessKey).subscribe(id => {
          localStorage.setItem('currentSessionId-'+this.route.snapshot.paramMap.get('title'), JSON.stringify(id));
          let endTime = moment(session.endTime, 'DD-MM-YYYY HH:mm:ss').toDate();
          let now = new Date();

          if (now < endTime) {
            this.userService.getUserById(session.supervisorId).subscribe(supervisor => {
              this.supervisorName = supervisor.firstName + ' ' + supervisor.lastName;
              this.startedTest = true;
            })
          } else {
            console.log('prea tarziu');
          }
        })
      } else {
        console.log('nu exista cheia')
      }
    })
    //this.startedTest = true;

  }

  advanceToSessionBeginning() {
    this.startedTest = true;

    this.generateAccessKey(6).subscribe(key => {
      this.accesskey = key;

      this.startTime = new Date();
      this.endTime = moment(this.startTime).add(this.selectedLength, 'm').toDate();

      this.openedSessionDatabase = <Session>{
        startTime: formatDate(this.startTime, 'yyyy-MM-dd HH:mm:ss', 'en-us'),
        endTime: formatDate(this.endTime, 'yyyy-MM-dd HH:mm:ss', 'en-us'),
        questionnaireId: this.examId,
        supervisorId: this.userId,
        accessKey: this.accesskey
      }
      this.openedSessionLocalStorage = <SessionForStorage>{
        startTime: this.startTime,
        endTime: this.endTime,
        questionnaireId: this.examId,
        supervisorId: this.userId,
        accessKey: this.accesskey
      }
      localStorage.setItem('session_' + this.exam.urlTitle, JSON.stringify(this.openedSessionLocalStorage));
      this.sessionService.insertSession(this.openedSessionDatabase).subscribe();

    });

  }

  startTest() {
    this.examService.currentExam = this.exam;
    this.router.navigateByUrl('/catalogue/' + this.exam.urlTitle + '/in-progress');
  }

  generateAccessKey(length: number): Observable<string> {
    return this.sessionService.getAccessKeys().pipe(map(keys => {
      let generatedKey;
      do {
        generatedKey = this.generateRandomString(length);
      } while (keys.includes(generatedKey));
      return generatedKey;
    }));
  }

  private generateRandomString(length: number) {
    var result = [];
    var characters = 'ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz0123456789';
    var charactersLength = characters.length;
    for (var i = 0; i < length; i++) {
      result.push(characters.charAt(Math.floor(Math.random() * charactersLength)));
    }
    return result.join('');
  }
}
