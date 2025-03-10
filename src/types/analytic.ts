export interface IAnalyticsSummary {
  metrics: {
    users: {
      total: number;
    };
    knowledges: {
      total: number;
    };
    missingAnswers: {
      total: number;
      dailyTrend: {
        date: string;
        count: number;
        type: string;
      }[];
    };
    activities: {
      today: {
        total: number;
        breakdown: {
          type: string;
          value: number;
        }[];
      };
    };
  };
}

export interface IGetAnalyticsSummaryResponse {
  status: boolean;
  message: string;
  data: IAnalyticsSummary;
  error?: unknown;
}
