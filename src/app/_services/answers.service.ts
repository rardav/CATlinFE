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

  updateAnswer(answer: Answer) {
    return this.http.put(this.baseUrl + 'answers', answer);
  }

  insertAnswer(answer: Answer) {
    return this.http.post<Answer>(this.baseUrl + 'answers', answer); 
  }

  deleteAnswer(id: number){
    return this.http.delete(this.baseUrl + 'answers/' + id);
  }
}
