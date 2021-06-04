import { Component, OnInit } from '@angular/core';
import { ChartDataSets, ChartOptions, ChartType } from 'chart.js';
import { Color, Label, MultiDataSet } from 'ng2-charts';
import { ExamsService } from 'src/app/_services/exams.service';
import { QuestionsService } from 'src/app/_services/questions.service';

@Component({
  selector: 'app-results',
  templateUrl: './results.component.html',
  styleUrls: ['./results.component.css']
})
export class ResultsComponent implements OnInit {

  constructor(public examService: ExamsService) { }

  ngOnInit(): void {
  }

  

  





}
