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
}
