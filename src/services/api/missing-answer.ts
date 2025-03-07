import axios from "axios";
import {
  ICreateMissingAnswerParams,
  ICreateMissingAnswerResponse,
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
};
