import { IGetLogsParams, IGetLogsResponse } from "@/types/logs";
import axios from "axios";

export const logService = {
  getAll: async (params: IGetLogsParams): Promise<IGetLogsResponse> => {
    const { data: response } = await axios.get<IGetLogsResponse>(
      `/api/logs?page=${params.page}&limit=${params.limit}`
    );

    if (!response.status) {
      throw new Error(response.message);
    }

    return response;
  },
};
