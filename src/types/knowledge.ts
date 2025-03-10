export interface IKnowledge {
  id: string;
  keywords: string[];
  answer: string;
  category: string;
}

export interface IGetAllKnowledgeParams {
  page: number;
  limit: number;
}

export interface IGetAllKnowledgeResponse {
  status: boolean;
  message: string;
  data: IKnowledge[];
  meta: {
    total: number;
    page: number;
    limit: number;
    totalPages: number;
  };
  error?: unknown;
}

export interface IGetKnowledgeDetailParams {
  id: string;
}

export interface IGetKnowledgeDetailResponse {
  status: boolean;
  message: string;
  data: IKnowledge;
  error?: unknown;
}

export interface ICreateKnowledgeParams {
  keywords: string[];
  answer: string;
  category: string;
}

export interface ICreateKnowledgeResponse {
  status: boolean;
  message: string;
  data: IKnowledge;
  error?: unknown;
}

export interface IUpdateKnowledgeParams {
  id: string;
  keywords: string[];
  answer: string;
  category: string;
}

export interface IUpdateKnowledgeResponse {
  status: boolean;
  message: string;
  data: IKnowledge;
  error?: unknown;
}

export interface IDeleteKnowledgeParams {
  id: string;
}

export interface IDeleteKnowledgeResponse {
  status: boolean;
  message: string;
  error?: unknown;
}
