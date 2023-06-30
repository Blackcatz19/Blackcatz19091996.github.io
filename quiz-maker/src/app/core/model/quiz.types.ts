export interface QuizCategories {
    trivia_categories: QuizCategoryData[];
}
export interface QuizCategoryData {
    id: number;
    name: string;
}
export interface QuizResponse {
    response_code: number;
    results: QuizResults[];
}
export interface QuizResults {
    category: string;
    correct_answer: string;
    incorrect_answers: string[];
    difficulty: string;
    question: string;
    type: string;
    choices: string[];
}

export interface QuizQesAns {
    id: number;
    question: string;
    choice: QuizChoice[];
    correctAnswer:string;
}
export interface QuizChoice{
    option:string;
    isActive:boolean;
    correctAns:boolean;
    inCorrectAns:boolean;
}

export interface QuizSelectedOptions{
    id:number;
    selectedOption:string;
}