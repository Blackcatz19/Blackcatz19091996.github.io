import { Component, Directive, HostListener, OnInit } from '@angular/core';
import { QuizQesAns, QuizSelectedOptions } from '../../model/quiz.types';
import { Router } from '@angular/router';
import { QuizDataService } from '../../services/quiz-data.service';

@Component({
  selector: 'app-result-page',
  templateUrl: './result-page.component.html',
  styleUrls: ['./result-page.component.scss']
})
export class ResultPageComponent implements OnInit {

  quizObjQesAns: QuizQesAns[] = [];
  quizSelectedOptions: QuizSelectedOptions[] = [];

  totalCorrectAns: number = 0;
  totalInCorrectAns: number = 0;

  constructor(private quizDataService: QuizDataService) { }
/**
 * Get all Quize Datas from Service Oninit
 */
  ngOnInit(): void {
    this.quizObjQesAns = this.quizDataService.getallQuizQes();
    this.quizSelectedOptions = this.quizDataService.getSelectedQuizQesAns();
    this.findCorrectInCorrentAns();
  }
  /**
   * To Count Correct Answers.
   */
  findCorrectInCorrentAns(): void {
    this.quizObjQesAns.forEach((qesObj) => {
      qesObj.choice.forEach((choice) => {
        if (choice.inCorrectAns) {
          this.totalInCorrectAns++;
        }
      })
    });
    this.totalCorrectAns = this.quizObjQesAns.length - this.totalInCorrectAns;
  }
}
