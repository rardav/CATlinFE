import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { environment } from 'src/environments/environment';
import { AnsweredQuestion } from '../_models/answered-question';

@Injectable({
  providedIn: 'root'
})
export class AnsweredQuestionsService {
  baseUrl = environment.apiUrl;

  constructor(private http: HttpClient) { }

  getAnsweredQuestions(id: number) {
    return this.http.get<AnsweredQuestion[]>(this.baseUrl + 'individualsessions/' + id + '/answeredquestions');
  }

  insertAnsweredQuestion(model: any) {
    return this.http.post<AnsweredQuestion>(this.baseUrl + 'answeredquestions', model); 
  }
}
