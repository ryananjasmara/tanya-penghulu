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
  metadata: {
    total: number;
    page: number;
    limit: number;
    totalPages: number;
  };
}
