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
  error?: unknown;
}

export interface IGetAllMissingAnswersResponse {
  status: boolean;
  message: string;
  data: IMissingAnswer[];
  meta: {
    total: number;
    page: number;
    limit: number;
    totalPages: number;
  };
  error?: unknown;
}

export interface IGetAllMissingAnswersParams {
  page: number;
  limit: number;
}
