import { Component, Input, OnInit } from '@angular/core';
import { Exam } from 'src/app/_models/exam';
import { ImagesService } from 'src/app/_services/images.service';

@Component({
  selector: 'app-exam-card',
  templateUrl: './exam-card.component.html',
  styleUrls: ['./exam-card.component.css']
})
export class ExamCardComponent implements OnInit {
  @Input() exam: Exam;
  imageUrl: string;

  constructor(private imageService: ImagesService) { }

  ngOnInit(): void {
    if(this.exam.imageId !== 0) {
      this.loadImage(this.exam.imageId);
    } 

  }

  loadImage(id: number) {
    this.imageService.getImage(id).subscribe( image => {
      this.imageUrl = image.url;
    })
  }

}
