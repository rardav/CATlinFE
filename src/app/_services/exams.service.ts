import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { environment } from 'src/environments/environment';
import { Exam } from '../_models/exam';

@Injectable({
  providedIn: 'root'
})
export class ExamsService {
  baseUrl = environment.apiUrl;

  constructor(private http: HttpClient) { }

  getExams() {
    return this.http.get<Exam[]>(this.baseUrl + 'questionnaires');
  }

  getExam(title: string) {
    return this.http.get<Exam>(this.baseUrl + 'questionnaires/' + title); 
  }

}
