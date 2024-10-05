// export interface IOption {
//   id: number; 
//   text: string; 
// }

// export interface IQuestion {
//   id: number; 
//   questionText: string; 
//   options: IOption[]; 
// }

// export interface IQuiz {
//   Title: string; 
//   Timer: number; 
//   Activated: boolean;
//   Questions: IQuestion[]; 
// }


export interface IQuizForm {
  quizTitle: string; 
  timer: string; 
  type: string; 
  startTime: string; 
  endTime: string; 
  date: string; 
  questions: IQuestion[]; 
}

export interface IQuestion {
  questionTitle: string;
  options: string[];
}
