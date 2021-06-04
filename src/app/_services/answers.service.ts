import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { environment } from 'src/environments/environment';
import { Answer } from '../_models/answer';

@Injectable({
  providedIn: 'root'
})
export class AnswersService {
  baseUrl = environment.apiUrl;

  constructor(private http: HttpClient) { }

  getAnswersFromQuestion(questionId: number) {
    return this.http.get<Answer[]>(this.baseUrl + 'questions/' + questionId + '/answers');
  }

  getAnswers() {
    return this.http.get<Answer[]>(this.baseUrl + 'answers');
  }
}
