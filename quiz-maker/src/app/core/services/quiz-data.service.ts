import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { QuizCategories, QuizQesAns, QuizResponse, QuizSelectedOptions } from '../model/quiz.types';

@Injectable({
  providedIn: 'root'
})
export class QuizDataService {

  baseUrl: string = 'https://opentdb.com/api.php';
  numberOfQuestions: number = 5;
  type: string = 'multiple';
  allQuizQes: QuizQesAns[] = [];
  selectedQuizQesAns: QuizSelectedOptions[] = [];
  constructor(private http: HttpClient) { }
  /**
    * To Fetech Categories
    * @returns Observable of QuizCategories
    */
  fetchQuizData(): Observable<QuizCategories> {
    return this.http.get<QuizCategories>('https://opentdb.com/api_category.php');
  }
  /**
     * To Fetch Quiz Questions from API
     * @param category Categegory Name
     * @param difficulty Level
     * @returns Observable of Quiz Questions
     */
  fetchQuizQuestions(category: string, difficulty: string): Observable<QuizResponse> {
    return this.http.get<QuizResponse>(`${this.baseUrl}?amount=${this.numberOfQuestions}&category=${category}&difficulty=${difficulty}&type=${this.type}`)
  }
  /**
     * Set All Quiz Questions
     * @param quizQes 
     */
  setQuizQes(quizQes: QuizQesAns[]) {
    this.allQuizQes = quizQes;
  }
  /**
     * Get All Quiz Questions
     * @returns All Quiz Questions
     */
  getallQuizQes() {
    return this.allQuizQes;
  }
  /**
   * Set Selected Answers
   * @param selectedQuizQesAns selected Answers
   */
  setSelectedQuizQesAns(selectedQuizQesAns: QuizSelectedOptions[]) {
    this.selectedQuizQesAns = selectedQuizQesAns;
  }
  /**
   * Get Selected Quiz Qes & Ans
   * @returns Selected Quiz Qestion & Answers
   */
  getSelectedQuizQesAns() {
    return this.selectedQuizQesAns;
  }
}