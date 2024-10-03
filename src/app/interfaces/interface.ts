export interface IOption {
  id: number; 
  text: string; 
}

export interface IQuestion {
  id: number; 
  questionText: string; 
  options: IOption[]; 
}

export interface IQuiz {
  Title: string; 
  Timer: number; 
  Activated: boolean;
  Questions: IQuestion[]; 
}
