export interface Question {
  id: string;
  text: string;
  answers: Array<Answer>;
}

export interface Answer {
  text: string;
  score?: 1 | 2 | 3 | 4;
}
