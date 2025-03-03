export interface IMissingAnswer {
  id: string;
  question: string;
  createdAt: Date;
}

export interface ICreateMissingAnswerParams {
  question: string;
}

export interface ICreateMissingAnswerResponse {
  status: boolean;
  message: string;
  data: IMissingAnswer;
}

