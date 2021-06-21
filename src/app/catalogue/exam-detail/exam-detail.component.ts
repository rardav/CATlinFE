import { formatDate } from '@angular/common';
import { Component, ElementRef, OnInit, ViewChild } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { ActivatedRoute, Router } from '@angular/router';
import * as moment from 'moment';
import { FileUploader } from 'ng2-file-upload';
import { ToastrService } from 'ngx-toastr';
import { Observable } from 'rxjs';
import { map } from 'rxjs/operators';
import { Answer } from 'src/app/_models/answer';
import { Exam } from 'src/app/_models/exam';
import { Image } from 'src/app/_models/image';
import { Question } from 'src/app/_models/question';
import { Session } from 'src/app/_models/session';
import { SessionForStorage } from 'src/app/_models/session-storage';
import { User } from 'src/app/_models/user';
import { AccountService } from 'src/app/_services/account.service';
import { AnswersService } from 'src/app/_services/answers.service';
import { ExamsService } from 'src/app/_services/exams.service';
import { ImagesService } from 'src/app/_services/images.service';
import { QuestionsService } from 'src/app/_services/questions.service';
import { SessionService } from 'src/app/_services/session.service';
import { UsersService } from 'src/app/_services/users.service';
import { environment } from 'src/environments/environment';

@Component({
  selector: 'app-exam-detail',
  templateUrl: './exam-detail.component.html',
  styleUrls: ['./exam-detail.component.css']
})
export class ExamDetailComponent implements OnInit {
  updateForm: FormGroup;
  addForm: FormGroup;
  validationErrors: string[] = [];
  uploader: FileUploader;
  hasBaseDropzoneOver = false;
  baseUrl = environment.apiUrl;

  exam: Exam;
  examId: number;
  currentUser$: Observable<User>;
  startedTest: boolean = false;
  startedUpdate: boolean = false;
  accesskey: string;
  examineeAccessKey: string;
  supervisorName: string;
  numberOfQuestions: number;
  selectedLength: number = 10;
  startTime: Date;
  endTime: Date;
  openedSessionDatabase: Session;
  openedSessionLocalStorage: SessionForStorage;
  userId: number;
  userToken: string;
  objectInsideLocalStorage: string;
  administratorQuestions: Question[] = [];
  questionToBeUpdated: Question = {imageId: 0} as Question;
  correctAnswerOfQuestionToBeUpdated: Answer;
  wrongAnswersOfQuestionToBeUpdated: Answer[] = [];
  questionToBeAdded: Question;
  correctAnswerOfQuestionToBeAdded: Answer = {} as Answer;
  wrongAnswersOfQuestionToBeAdded: Answer[] = [{} as Answer, {} as Answer, {} as Answer];
  insertedImageId: number;
  imageOfQuestionToBeUpdated: Image;

  constructor(private examService: ExamsService,
    private route: ActivatedRoute,
    private accountService: AccountService,
    private router: Router,
    private questionService: QuestionsService,
    private userService: UsersService,
    private sessionService: SessionService,
    private answerService: AnswersService,
    private toastr: ToastrService,
    private imageService: ImagesService,
    private formBuilder: FormBuilder) { }

  ngOnInit(): void {
    this.objectInsideLocalStorage = localStorage.getItem('session_' + this.route.snapshot.paramMap.get('title'));
    if (this.objectInsideLocalStorage) {
      this.openedSessionLocalStorage = JSON.parse(this.objectInsideLocalStorage);
    }
    this.initializeUploader();

    this.getCurrentUserData();
    this.loadExam();
    this.loadExamId();
  }

  initializeUpdateForm() {
    this.updateForm = this.formBuilder.group({
      question: ['', Validators.required],
      difficulty: [0],
      timeToAnswer: [60],
      correctAnswer: ['', Validators.required],
      wrongAnswer1: ['', Validators.required],
      wrongAnswer2: ['', Validators.required],
      wrongAnswer3: ['', Validators.required],
    })
  }

  initializeAddForm() {
    this.addForm = this.formBuilder.group({
      question: ['', Validators.required],
      difficulty: [0],
      timeToAnswer: [60],
      correctAnswer: ['', Validators.required],
      wrongAnswer1: ['', Validators.required],
      wrongAnswer2: ['', Validators.required],
      wrongAnswer3: ['', Validators.required],
    })
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

  loadQuestionsFromAdministrator(id: number) {
    this.questionService.getQuestionsFromAdministrator(id, this.examId).subscribe(questions => {
      questions.sort((a, b) => (a.difficulty > b.difficulty) ? -1 : 1);
      this.administratorQuestions = questions;
      this.numberOfQuestions = questions.length;
    })
  }

  private getCurrentUserData() {
    this.currentUser$ = this.accountService.currentUser$;
    this.currentUser$.subscribe(currUser => {
      if (!!currUser) {
        this.userToken = currUser.token;
        this.loadUserId(currUser.email);
      }
    })
  }

  loadUserId(email: string) {
    this.userService.getId(email).subscribe(id => {
      this.userId = id;
    })
  }

  loadAnswersOfQuestionToBeUpdated(id: number){
    this.wrongAnswersOfQuestionToBeUpdated = []
    this.answerService.getAnswersFromQuestion(id).subscribe(answers => {
      console.log(answers);
      answers.forEach(answer => {
        answer.isCorrect ? this.correctAnswerOfQuestionToBeUpdated = answer : this.wrongAnswersOfQuestionToBeUpdated.push(answer);
      })
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

  advanceToExamUpdating() {
    this.startedUpdate = true;
    this.loadQuestionsFromAdministrator(this.userId);
  }

  onAdministratorRowClick(question: Question){
    this.initializeUpdateForm();
    this.imageOfQuestionToBeUpdated = null;
    this.questionToBeUpdated = question;

    this.imageService.getImage(this.questionToBeUpdated.imageId).subscribe(image => {
      this.imageOfQuestionToBeUpdated = image;
      this.loadAnswersOfQuestionToBeUpdated(this.questionToBeUpdated.id);
    })

    this.initializeUpdateForm();
  }

  onUpdateQuestion() {
    this.questionService.updateQuestion(this.questionToBeUpdated).subscribe(() => {
       this.answerService.updateAnswer(this.correctAnswerOfQuestionToBeUpdated).subscribe( () => {
        this.wrongAnswersOfQuestionToBeUpdated.forEach(answer => {
          this.answerService.updateAnswer(answer).subscribe( () => {
            this.loadQuestionsFromAdministrator(this.userId);
          })
        });
       })
      
      this.toastr.success('Question updated successfully.');
    })
  }

  onDeleteQuestion() {
    this.answerService.deleteAnswer(this.questionToBeUpdated.id).subscribe( response => {
      this.questionService.deleteQuestion(this.questionToBeUpdated.id).subscribe( response => {
        this.loadQuestionsFromAdministrator(this.userId);
      });
    })

    this.toastr.success('Question deleted successfully.');
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

  generateUniqueKey(length: number): Observable<string> {
    return this.questionService.getUniqueKeys().pipe(map(keys => {
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

  initializeUploader() {
    this.uploader = new FileUploader({
      url: this.baseUrl + 'questions/add-photo',
      authToken: 'Bearer ' + this.userToken,
      isHTML5: true,
      allowedFileType: ['image'],
      removeAfterUpload: true,
      autoUpload: false,
      maxFileSize: 10 * 1024 * 1024
    })
  
    this.uploader.onAfterAddingFile = (file) => {
      file.withCredentials = false;
    }

    this.uploader.onSuccessItem = (item, response, status, headers) => {
      if(response) {
        const photo = JSON.parse(response);
        this.uploadImage(photo);
      }
    }
  }

  fileOverBase(e: any) {
    this.hasBaseDropzoneOver = e;
  }

  uploadImage(image: any) {
    this.imageService.insertImage(image).subscribe(response => {
      this.getImageId(image.publicId);
    });
  }

  getImageId(url: string) {
    this.imageService.getImageId(url).subscribe(id => {
      this.questionToBeAdded.imageId = id;
    })
  }

  onOpenAddModal() {
    this.questionToBeAdded = {difficulty: 0, timeToAnswer: 60} as Question;
    this.correctAnswerOfQuestionToBeAdded = {} as Answer;
    this.wrongAnswersOfQuestionToBeAdded = [{} as Answer, {} as Answer, {} as Answer];
    this.initializeAddForm();
  }

  onAddQuestion() {
    this.questionToBeAdded.administratorId = this.userId;
    this.questionToBeAdded.questionnaireId = this.examId;
    this.generateUniqueKey(20).subscribe( key => {
      this.questionToBeAdded.uniqueKey = key;
      console.log(this.questionToBeAdded);
      this.questionService.insertQuestion(this.questionToBeAdded).subscribe(response => {
        this.questionService.getQuestionByKey(this.questionToBeAdded.uniqueKey).subscribe(question => {
          this.correctAnswerOfQuestionToBeAdded.isCorrect = true;
          this.correctAnswerOfQuestionToBeAdded.questionId = question.id;
          this.answerService.insertAnswer(this.correctAnswerOfQuestionToBeAdded).subscribe(response => {
            this.wrongAnswersOfQuestionToBeAdded.forEach(answer => {
              answer.isCorrect = false;
              answer.questionId = question.id;
              this.answerService.insertAnswer(answer).subscribe(response => {
                this.loadQuestionsFromAdministrator(this.userId);
              })
            })
          })
        })
      });
    })
  }

}
