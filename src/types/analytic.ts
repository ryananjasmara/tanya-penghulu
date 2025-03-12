export interface IAnalyticsSummary {
  metrics: {
    users: {
      total: number;
    };
    knowledges: {
      total: number;
    };
    feedbacks: {
      positive: number;
      negative: number;
    };
    missingAnswers: {
      total: number;
      dailyTrend: {
        date: string;
        count: number;
        type: string;
      }[];
    };
  };
}

export interface IGetAnalyticsSummaryResponse {
  status: boolean;
  message: string;
  data: IAnalyticsSummary;
  error?: unknown;
}
