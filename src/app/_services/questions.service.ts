import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { environment } from 'src/environments/environment';
import { Question } from '../_models/question';

@Injectable({
  providedIn: 'root'
})
export class QuestionsService {
  baseUrl = environment.apiUrl;

  constructor(private http: HttpClient) { }

  getQuestionsFromQuestionnaire(questionnaireId: number) {
    return this.http.get<Question[]>(this.baseUrl + 'questionnaires/' + questionnaireId + '/questions');
  }

  getQuestionByKey(key: string) {
    return this.http.get<Question>(this.baseUrl + 'questions/key/' + key);
  }

  getQuestionsFromAdministrator(adminId: number, examId: number) {
    return this.http.get<Question[]>(this.baseUrl + 'users/' + adminId + '/questionnaires/' + examId + '/questions');
  }

  getUniqueKeys() {
    return this.http.get<string[]>(this.baseUrl + 'questions/keys');
  }

  updateQuestion(question: Question) {
    return this.http.put(this.baseUrl + 'questions', question);
  }

  insertQuestion(question: Question) {
    return this.http.post<Question>(this.baseUrl + 'questions', question); 
  }

  deleteQuestion(id: number){
    return this.http.delete(this.baseUrl + 'questions/' + id);
  }
}
