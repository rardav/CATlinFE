import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { environment } from 'src/environments/environment';
import { Exam } from '../_models/exam';
import { Question } from '../_models/question';

@Injectable({
  providedIn: 'root'
})
export class ExamsService {
  baseUrl = environment.apiUrl;
  currentExam: Exam;
  answeredQuestions: Question[];
  correctAnswers: number[];
  currentMark: number;

  constructor(private http: HttpClient) { }

  getExams() {
    return this.http.get<Exam[]>(this.baseUrl + 'questionnaires');
  }

  getExam(title: string) {
    return this.http.get<Exam>(this.baseUrl + 'questionnaires/title/' + title);
  }

  getExamById(id: number) {
    return this.http.get<Exam>(this.baseUrl + 'questionnaires/id/' + id);
  }

  getExamIdByTitle(title: string) {
    return this.http.get<number>(this.baseUrl + 'questionnaires/' + title + '/id');
  }

}
