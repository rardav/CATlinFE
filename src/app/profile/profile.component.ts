import { Component, OnInit } from '@angular/core';
import { ChartDataSets, ChartType } from 'chart.js';
import { Color, Label, MultiDataSet } from 'ng2-charts';
import { Observable } from 'rxjs';
import { AnsweredQuestion } from '../_models/answered-question';
import { Exam } from '../_models/exam';
import { IndividualSession } from '../_models/individual-session';
import { IndividualSessionData } from '../_models/individual-session-data';
import { Session } from '../_models/session';
import { User } from '../_models/user';
import { AccountService } from '../_services/account.service';
import { AnsweredQuestionsService } from '../_services/answered-questions.service';
import { ExamsService } from '../_services/exams.service';
import { IndividualSessionService } from '../_services/individual-session.service';
import { SessionService } from '../_services/session.service';
import { UsersService } from '../_services/users.service';

@Component({
  selector: 'app-profile',
  templateUrl: './profile.component.html',
  styleUrls: ['./profile.component.css']
})
export class ProfileComponent implements OnInit {
  currentUser$: Observable<User>;
  user: User;
  userId: number;
  counter: number = 0;
  individualSessionsData: IndividualSessionData[] = [];
  mark: number = 0;

  indivSessions: IndividualSession[] = [];
  exams: Exam[] = [];
  sessions: Session[] = [];


  lineChartLabels: Label[] = [];
  doughnutChartLabels: Label[] = ['Correct answers', 'Wrong answers'];
  lineChartOptions = {
    responsive: true
  };
  lineChartColors: Color[] = [
    {
      borderColor: 'black',
      backgroundColor: 'rgba(255,255,0,0.28)',
    },
  ];
  lineChartLegend = true;
  lineChartFill = false;
  lineChartPlugins = [];
  lineChartType: ChartType = 'line';
  doughnutChartType: ChartType = 'doughnut';
  lineChartData: ChartDataSets[] = [];
  doughnutChartData: MultiDataSet;
  doughnutChartReady: boolean = false;
  lineChartReady: boolean = false;


  constructor(private accountService: AccountService,
    private individualSessionService: IndividualSessionService,
    private userService: UsersService,
    private examService: ExamsService,
    private sessionService: SessionService,
    private answeredQuestionService: AnsweredQuestionsService) { }

  ngOnInit(): void {
    this.getCurrentUserData()
  }

  onRowClick(sessionId: number) {
    this.mark = this.individualSessionsData.find(data => data.individualSession.sessionId === sessionId).individualSession.ability;

    this.individualSessionService.getIdOfIndividualSession(sessionId, this.userId).subscribe(id => {
      this.answeredQuestionService.getAnsweredQuestions(id).subscribe(questions => {
        if(questions){
        
          questions.sort((a, b) => a.numberOfOrder < b.numberOfOrder ? -1 : (a.numberOfOrder > b.numberOfOrder ? 1 : 0))

        this.lineChartLabels = questions.map(question => (questions.indexOf(question)+1).toString());

         this.lineChartData = [
          { data: questions.map(question => question.questionDifficulty),
            label: 'Difficulty levels of administered questions',
            fill: false },
        ];
          this.doughnutChartData = [
          [questions.filter(x => x.answeredCorrectly === 1).length,
            questions.filter(x => x.answeredCorrectly === 0).length]
        ];

        this.doughnutChartReady = true;
        this.lineChartReady = true;
        
      
      }
      })
    })
  }

  logout() {
    this.accountService.logout();
  }

  private getCurrentUserData() {
    this.currentUser$ = this.accountService.currentUser$;
    this.currentUser$.subscribe(user => {
      if (user) {
        this.user = user;
        this.loadUser(this.user.email);
      }
    });
  }

  loadUser(email: string) {
    this.userService.getUser(email).subscribe(user => {
      if (user) {
        this.user = user;
        this.loadId(this.user.email);
      }
    })
  }

  loadId(email: string) {
    this.userService.getId(email).subscribe(id => {
      if (id) {
        this.userId = id;
        this.loadIndividualSessions(this.userId);
      }
    })
  }

  loadIndividualSessions(id: number) {
    this.individualSessionService.getIndividualSessions(id).subscribe(sessions => {
      if (sessions) {
        sessions.forEach(session => {
          this.indivSessions.push(session);
          this.loadSession(session.sessionId);
        });
      }
    })
  }

  loadSession(id: number) {
    this.sessionService.getSession(id).subscribe(session => {
      if (session) {
        this.sessions.push(session);
        this.loadExam(session.questionnaireId);
      }
    })
  }

  loadExam(id: number) {
    this.examService.getExamById(id).subscribe(exam => {
      if (exam) {
        this.exams.push(exam);
        let data: IndividualSessionData = ({ individualSession: this.indivSessions[this.counter], session: this.sessions[this.counter], exam: this.exams[this.counter] });
        this.counter++;
        this.individualSessionsData.push(data);
      }
    })
  }
}
