import { formatDate } from '@angular/common';
import { Component, Input, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { ToastrService } from 'ngx-toastr';
import { Observable } from 'rxjs';
import { Answer } from 'src/app/_models/answer';
import { AnsweredQuestion } from 'src/app/_models/answered-question';
import { IndividualSession } from 'src/app/_models/individual-session';
import { Question } from 'src/app/_models/question';
import { User } from 'src/app/_models/user';
import { AccountService } from 'src/app/_services/account.service';
import { AnsweredQuestionsService } from 'src/app/_services/answered-questions.service';
import { AnswersService } from 'src/app/_services/answers.service';
import { ExamsService } from 'src/app/_services/exams.service';
import { IndividualSessionService } from 'src/app/_services/individual-session.service';
import { IrtService } from 'src/app/_services/irt.service';
import { NavbarService } from 'src/app/_services/navbar.service';
import { QuestionsService } from 'src/app/_services/questions.service';
import { UsersService } from 'src/app/_services/users.service';

@Component({
  selector: 'app-exam-in-progress',
  templateUrl: './exam-in-progress.component.html',
  styleUrls: ['./exam-in-progress.component.css']
})

export class ExamInProgressComponent implements OnInit {
  individualSession: IndividualSession = {} as IndividualSession;
  user: User;
  userId: number;
  currentUser$: Observable<User>;
  questions: Question[];
  currentQuestion: Question;
  answers: Answer[];
  currentAnswers: Answer[];
  chosenAnswer: Answer = {} as Answer;
  noOfQuestionsAnswered: number = 0;
  startTime: string;
  endTime: string;
  @Input() examTitle: string;

  // IRT
  theta: number;
  difficulty: number;
  sigmaSquare: number;
  standardError: number;
  phi: number;
  Phi: number;
  D: number;

  usedQuestions: Question[] = [];
  answersGiven: number[] = [];


  constructor(public navService: NavbarService,
    public individualSessionService: IndividualSessionService,
    public userService: UsersService,
    public accountService: AccountService,
    private questionService: QuestionsService,
    private answerService: AnswersService,
    private router: Router,
    private irt: IrtService,
    private toastr: ToastrService,
    private examService: ExamsService,
    private answeredQuestionService: AnsweredQuestionsService) {
  }

  ngOnInit(): void {
    this.navService.hide();

    this.startNewSession();

    this.startTime = formatDate(new Date(), 'yyyy-MM-dd hh:mm:ss', 'en-us');
  }

  private startNewSession() {
    this.getCurrentUserData();

    this.theta = 0.5;
    this.difficulty = 0.5;
    this.sigmaSquare = 1;
    this.standardError = this.irt.calculateStandardError(this.sigmaSquare);
    this.D = this.irt.calculateD(this.difficulty, this.theta, this.sigmaSquare);
    this.phi = this.irt.calculateOrdinateValueOfNormalCurveAtPointD(this.D);

    this.startTime = formatDate(new Date(), 'yyyy-MM-dd hh:mm:ss', 'en-us')

    // if (localStorage.getItem('currentIndividualSession') === null) {
    //   this.individualSession = <IndividualSession>{
    //     ability: this.theta,
    //     standardError: this.sigmaSquare,
    //     startTime: formatDate(new Date(), 'yyyy-MM-dd hh:mm:ss', 'en-us'),
    //     examineeId: 1,
    //     sessionId: 1
    //   };

    //   localStorage.setItem('currentIndividualSession', JSON.stringify(this.individualSession));
    // }

    // let json = localStorage.getItem('currentIndividualSession');
    // this.individualSession = JSON.parse(json);
    this.loadData();
  }

  //=========================================================== events

  onNextClick() {
    this.noOfQuestionsAnswered++;

    if (this.isChosenAnswerCorrect()) {
      this.answersGiven.push(1);
      this.Phi = this.irt.calculateAreaUnderTheNormalCurve(this.D);
      this.theta = this.irt.calculateCorrectAnswerTheta(this.theta, this.sigmaSquare, this.phi, this.Phi);
      this.sigmaSquare = this.irt.calculateCorrectAnswerSigmaSquare(this.D, this.sigmaSquare, this.phi, this.Phi);
    } else {
      this.answersGiven.push(0);
      this.Phi = this.irt.calculateAreaUnderTheNormalCurve(-1 * this.D);
      this.theta = this.irt.calculateWrongAnswerTheta(this.theta, this.sigmaSquare, this.phi, this.Phi);
      this.sigmaSquare = this.irt.calculateWrongAnswerSigmaSquare(this.D, this.sigmaSquare, this.phi, this.Phi);
    }

    this.difficulty = this.theta;
    this.D = this.irt.calculateD(this.difficulty, this.theta, this.sigmaSquare);
    this.phi = this.irt.calculateOrdinateValueOfNormalCurveAtPointD(this.D);
    this.standardError = this.irt.calculateStandardError(this.sigmaSquare);

    this.currentQuestion = this.chooseNextItem(this.theta);
    this.difficulty = this.currentQuestion.difficulty;
    this.currentAnswers = this.answers.filter(answer => answer.questionId === this.currentQuestion.id);
    this.shuffle(this.currentAnswers);

  }

  onFinishClick() {
    if (this.isChosenAnswerCorrect()) {
      this.answersGiven.push(1);
      this.Phi = this.irt.calculateAreaUnderTheNormalCurve(this.D);
      this.theta = this.irt.calculateCorrectAnswerTheta(this.theta, this.sigmaSquare, this.phi, this.Phi);
    } else {
      this.answersGiven.push(0);
      this.Phi = this.irt.calculateAreaUnderTheNormalCurve(-1 * this.D);
      this.theta = this.irt.calculateWrongAnswerTheta(this.theta, this.sigmaSquare, this.phi, this.Phi);
    }

    this.endTime = formatDate(new Date(), 'yyyy-MM-dd hh:mm:ss', 'en-us');
    
    
    this.examService.answeredQuestions = this.usedQuestions;
    this.examService.correctAnswers = this.answersGiven;

    
    let mark = (this.theta+2)*2.25+1;
    if (mark > 10) mark = 10;
    if (mark < 1 ) mark = 1;

    this.examService.currentMark = mark;

    //create and send individual session
    this.individualSession = <IndividualSession>{
      ability: mark,
      standardError: this.sigmaSquare,
      startTime: this.startTime,
      endTime: this.endTime,
      examineeId: this.userId,
      sessionId: 1
    };
    let individualSessionId: number;

    this.individualSessionService.insertIndividualSession(this.individualSession).subscribe(response => {
      this.navService.show();
      this.router.navigateByUrl('/catalogue/' + this.examService.currentExam.urlTitle + '/in-progress/results');
      this.individualSessionService.getIdOfIndividualSession(this.individualSession.sessionId, this.individualSession.examineeId).subscribe(response => {
        individualSessionId = response;

        let i=0;
        this.usedQuestions.forEach(question => {
          let answeredQuestion: AnsweredQuestion = <AnsweredQuestion> {
            individualSessionId: individualSessionId,
            questionDifficulty: question.difficulty,
            answeredCorrectly: this.answersGiven[i],
            numberOfOrder: i++
          }

          this.answeredQuestionService.insertAnsweredQuestion(answeredQuestion).subscribe(response => {

          });
        })
      })
    }, error => {
      console.log(error);
      this.toastr.error(error.error);
    });




  }

  //===========================================================

  private getCurrentUserData() {
    this.currentUser$ = this.accountService.currentUser$;
    this.currentUser$.subscribe(currUser => {
      if (!!currUser) {
        this.loadUser(currUser.email);
        this.loadUserId(currUser.email);
      }
    })
  }

  loadUserId(email: string) {
    this.userService.getId(email).subscribe(id => {
      this.userId = id;
    })
  }

  loadUser(email: string) {
    this.userService.getUser(email).subscribe(user => {
      this.user = user;
    })
  }

  loadData() {
    this.questionService.getQuestionsFromQuestionnaire(1).subscribe(questions => {
      this.questions = questions;
      this.currentQuestion = this.chooseNextItem(this.theta);
      this.loadAnswers();
    });
  }

  loadAnswers() {
    this.answerService.getAnswers().subscribe(answers => {
      this.answers = answers;
      this.currentAnswers = this.answers.filter(answer => answer.questionId === this.currentQuestion.id);
      this.shuffle(this.currentAnswers);
    });
  }

  shuffle(array: Answer[]) {
    var currentIndex = array.length, temporaryValue: Answer, randomIndex: number;

    while (0 !== currentIndex) {

      randomIndex = Math.floor(Math.random() * currentIndex);
      currentIndex -= 1;

      temporaryValue = array[currentIndex];
      array[currentIndex] = array[randomIndex];
      array[randomIndex] = temporaryValue;
    }

    return array;
  }

  getChosenAnswerData(answer: Answer) {
    this.chosenAnswer = answer;
  }

  isChosenAnswerCorrect() {
    return this.chosenAnswer.isCorrect;
  }

  //IRT

  chooseNextItem(level: number) {
    let precision = 0.05;
    let fitQuestions = this.questions.filter(q => q.difficulty < level + precision).filter(q => q.difficulty > level - precision).filter(q => !this.usedQuestions.includes(q));
    let nextQuestion = fitQuestions[Math.floor(Math.random() * fitQuestions.length)];
    this.usedQuestions.push(nextQuestion);
    console.log('difficulty ' + nextQuestion.difficulty)

    return nextQuestion;
  }

}
