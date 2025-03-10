import { useQuery } from "@tanstack/react-query";

import { IGetLogsResponse } from "@/types/logs";
import { IGetLogsParams } from "@/types/logs";
import { UseQueryResult } from "@tanstack/react-query";
import { logService } from "../api";

const LOG_QUERY_KEY = {
  getAll: "logs.getAll",
} as const;

export const useGetAllLogs = (
  params: IGetLogsParams
): UseQueryResult<IGetLogsResponse> => {
  const query = useQuery({
    queryKey: [LOG_QUERY_KEY.getAll, params],
    queryFn: async () => {
      const response = await logService.getAll(params);
      return response;
    },
  });

  return query;
};
