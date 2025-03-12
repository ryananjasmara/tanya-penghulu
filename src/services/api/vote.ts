import {
  ICreateVoteParams,
  ICreateVoteResponse,
  IGetAllVotesParams,
  IGetAllVotesResponse,
} from "@/types/vote";
import axios from "axios";

export const voteService = {
  getAll: async (params: IGetAllVotesParams): Promise<IGetAllVotesResponse> => {
    const { data: response } = await axios.get<IGetAllVotesResponse>(
      `/api/chat-votes?page=${params.page}&limit=${params.limit}`
    );

    if (!response.status) {
      throw new Error(response.message);
    }

    return response;
  },
  create: async (params: ICreateVoteParams): Promise<ICreateVoteResponse> => {
    const { data: response } = await axios.post<ICreateVoteResponse>(
      `/api/chat-votes`,
      params
    );

    if (!response.status) {
      throw new Error(response.message);
    }

    return response;
  },
};
