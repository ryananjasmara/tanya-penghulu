import axios from "axios";
import {
  ICreateMissingAnswerParams,
  ICreateMissingAnswerResponse,
  IGetAllMissingAnswersParams,
  IGetAllMissingAnswersResponse,
} from "@/types/missing-answer";

export const missingAnswerService = {
  create: async (
    params: ICreateMissingAnswerParams
  ): Promise<ICreateMissingAnswerResponse> => {
    const { data: response } = await axios.post<ICreateMissingAnswerResponse>(
      "/api/missing-answers",
      params
    );

    if (!response.status) {
      throw new Error(response.message);
    }

    return response;
  },
  getAll: async (
    params: IGetAllMissingAnswersParams
  ): Promise<IGetAllMissingAnswersResponse> => {
    const { data: response } = await axios.get<IGetAllMissingAnswersResponse>(
      `/api/missing-answers?limit=${params.limit}&page=${params.page}`
    );

    if (!response.status) {
      throw new Error(response.message);
    }

    return response;
  },
};
