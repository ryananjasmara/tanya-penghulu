import { IKnowledge } from "./knowledge";

export type VoteType = "UPVOTE" | "DOWNVOTE";

export type IVote = {
  id: string;
  knowledge: IKnowledge;
  vote: VoteType;
  feedback?: string;
  createdAt: Date;
  updatedAt: Date;
};

export type ICreateVoteParams = {
  question: string;
  knowledgeId: string;
  vote: VoteType;
  feedback?: string;
};

export type ICreateVoteResponse = {
  status: boolean;
  message: string;
  data: IVote;
  error?: unknown;
};

export type IGetAllVotesResponse = {
  status: boolean;
  message: string;
  data: IVote[];
  meta: {
    total: number;
    page: number;
    limit: number;
    totalPages: number;
  };
  error?: unknown;
};

export type IGetAllVotesParams = {
  page: number;
  limit: number;
};