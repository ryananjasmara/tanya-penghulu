import { UseQueryResult } from "@tanstack/react-query";
import { useQuery } from "@tanstack/react-query";
import { IGetAnalyticsSummaryResponse } from "@/types/analytic";
import { analyticService } from "../api";

const ANALYTIC_QUERY_KEY = {
  getAll: "analytics.getAll",
} as const;

export const useGetAnalyticsSummary =
  (): UseQueryResult<IGetAnalyticsSummaryResponse> => {
    const query = useQuery({
      queryKey: [ANALYTIC_QUERY_KEY.getAll],
      queryFn: async () => {
        const response = await analyticService.getAll();
        return response;
      },
    });

    return query;
  };
