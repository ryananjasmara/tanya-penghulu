import axios from "axios";
import { IGetAllKnowledgeParams, IGetAllKnowledgeResponse } from "@/types/knowledge";

export const knowledgeService = {
  getAll: async (
    params: IGetAllKnowledgeParams
  ): Promise<IGetAllKnowledgeResponse> => {
    const { data: response } = await axios.get<IGetAllKnowledgeResponse>(
      `/api/knowledges?limit=${params.limit}&page=${params.page}`
    );

    if (!response.status) {
      throw new Error(response.message);
    }

    return response;
  },
};
