import { HttpClient } from '@angular/common/http';
import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css']
})
export class AppComponent implements OnInit{
  title = 'CATlin';
  questionnaires: any;

  constructor(private http: HttpClient) {}

  ngOnInit() {
    this.getQuestionnaires();
  }

  private getQuestionnaires() {
    this.http.get('https://localhost:44353/api/Questionnaires').subscribe(response => {
      this.questionnaires = response;
    }, error => {
      console.log(error);
    });
  }
}
