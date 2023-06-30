import { Component, OnInit } from '@angular/core';
import { QuizDataService } from '../../services/quiz-data.service'; 
import { QuizCategories, QuizCategoryData, QuizChoice, QuizQesAns, QuizResponse, QuizResults, QuizSelectedOptions } from '../../model/quiz.types';
import { Router } from '@angular/router';

@Component({
  selector: 'app-landing-page',
  templateUrl: './landing-page.component.html',
  styleUrls: ['./landing-page.component.scss']
})

export class LandingPageComponent implements OnInit {
  categoryObj: QuizCategoryData[] = [];
  difficultyLvl: string[] = ['easy', 'medium', 'hard'];
  selectedCategoryOptions: string = '';
  selectedDifficultyOptions: string = '';
  quizResults: QuizResults[] = [];
  responseCode: number = 0;
  quizObjQesAns: QuizQesAns[] = [];
  quizCreated: boolean = false;
  isAllQuizAnsSelected: boolean = false;
  quizSelectedOptions: QuizSelectedOptions[] = [];

  constructor(private quizDataService: QuizDataService, private router: Router) {
  }
  /**
   * To Fetch Categories & 
   */
  ngOnInit(): void {
    this.quizDataService.fetchQuizData().subscribe((data: QuizCategories) => {
      this.categoryObj = data.trivia_categories;
    });
  }
  /**
   * Create Quiz
   */
  createQuiz(): void {
    this.isAllQuizAnsSelected = false;
    if (this.selectedCategoryOptions && this.selectedDifficultyOptions) {
      this.quizDataService.fetchQuizQuestions(this.selectedCategoryOptions, this.selectedDifficultyOptions).subscribe((data: QuizResponse) => {
        this.quizResults = [];
        this.quizResults = data.results;
        this.responseCode = data.response_code;
        this.arrangeQuiz(this.quizResults);
        this.quizCreated = true;
      });
    }
  }
  /**
   * Arrange Quiz for assigning Quiz Data
   * @param quizResult 
   */
  arrangeQuiz(quizResult: QuizResults[]): void {
    if (quizResult) {
      this.quizObjQesAns = [];
      this.quizSelectedOptions = [];
      quizResult.map((elements: QuizResults, index: number) => {
        let incorrect_answer = elements.incorrect_answers;

        let correct_answer = elements.correct_answer;
        incorrect_answer.push(correct_answer);

        let choiceObjArr: QuizChoice[] = [];
        for (const item of this.shuffleArray(incorrect_answer)) {
          choiceObjArr.push({ option: item, isActive: false, correctAns: false, inCorrectAns: false })
        }
        this.quizObjQesAns.push({
          id: index,
          question: elements.question,
          choice: choiceObjArr,
          correctAnswer: elements.correct_answer
        });

        this.quizSelectedOptions.push({
          id: index,
          selectedOption: ''
        });
      });
    }
  }

  /**
   * Shuffle Array of Options
   * @param array 
   * @returns array
   */
  shuffleArray<T>(array: T[]): T[] {
    const newArray = [...array];

    newArray.sort(() => Math.random() - 0.5);

    return newArray;
  }
  /**
   * To find Selected Answers
   * @param qesIndex 
   * @param qesId 
   * @param ans 
   */
  selectedAnswer(qesIndex: number, qesId: number, ans: string): void {
    this.quizObjQesAns[qesIndex].choice.forEach((choiceObj) => {
      if (choiceObj.option === ans) {
        choiceObj.isActive = true;
        if (this.quizObjQesAns[qesIndex].correctAnswer === ans) {
          choiceObj.correctAns = true;
          choiceObj.inCorrectAns = false;
        }
        else {
          choiceObj.correctAns = false;
          choiceObj.inCorrectAns = true;
        }
      }
      else {
        choiceObj.isActive = false;
        choiceObj.correctAns = false;
        choiceObj.inCorrectAns = false;
        if (this.quizObjQesAns[qesIndex].correctAnswer == choiceObj.option) {
          choiceObj.correctAns = true;
        } else {
          choiceObj.correctAns = false;
        }
      }
    })
    for (const qesSelectedAns of this.quizSelectedOptions) {
      if (qesSelectedAns.id === qesId) {
        qesSelectedAns.selectedOption = ans;
        break;
      }
    }
    this.isAllQuizAnsSelected = this.quizSelectedOptions.every(item => item.hasOwnProperty('selectedOption') && item.selectedOption !== '');
  }

  /**
   * This method is for Submit the Quiz
   */
  submitQuiz(): void {
    this.quizDataService.setQuizQes(this.quizObjQesAns);
    this.quizDataService.setSelectedQuizQesAns(this.quizSelectedOptions);
    this.router.navigate(['/results']);
  }
}
