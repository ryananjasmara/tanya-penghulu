import { IGetAnalyticsSummaryResponse } from "@/types/analytic";
import axios from "axios";

export const analyticService = {
  getAll: async (): Promise<IGetAnalyticsSummaryResponse> => {
    const { data: response } = await axios.get<IGetAnalyticsSummaryResponse>(
      `/api/analytics/summary`
    );

    if (!response.status) {
      throw new Error(response.message);
    }

    return response;
  },
};
