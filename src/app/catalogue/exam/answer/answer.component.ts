import { Component, Input, OnInit, Output, EventEmitter } from '@angular/core';
import { Answer } from 'src/app/_models/answer';

@Component({
  selector: 'app-answer',
  templateUrl: './answer.component.html',
  styleUrls: ['./answer.component.css']
})
export class AnswerComponent implements OnInit {
  @Input() answer: Answer
  @Output() onAnswerChosen = new EventEmitter<Answer>();

  constructor() { }

  ngOnInit(): void {
  }

  onClick() {
    this.chooseAnswer();
  }

  public chooseAnswer(): void {
    this.onAnswerChosen.emit(this.answer);
  }
}

