import {
  useMutation,
  UseMutationResult,
  useQuery,
  UseQueryResult,
} from "@tanstack/react-query";
import { missingAnswerService } from "../api";
import {
  ICreateMissingAnswerParams,
  ICreateMissingAnswerResponse,
  IGetAllMissingAnswersParams,
  IGetAllMissingAnswersResponse,
} from "@/types/missing-answer";

export const MISSING_ANSWER_QUERY_KEY = {
  create: "missing-answers.create",
  getAll: "missing-answers.getAll",
} as const;

export const useCreateMissingAnswer = (): UseMutationResult<
  ICreateMissingAnswerResponse,
  unknown,
  ICreateMissingAnswerParams,
  unknown
> => {
  const mutation = useMutation<
    ICreateMissingAnswerResponse,
    unknown,
    ICreateMissingAnswerParams,
    unknown
  >({
    mutationKey: [MISSING_ANSWER_QUERY_KEY.create],
    mutationFn: async (data: ICreateMissingAnswerParams) => {
      const response = await missingAnswerService.create(data);
      return response;
    },
    onError: (error: unknown) => {
      throw error;
    },
    retry: 0,
  });

  return mutation;
};

export const useGetAllMissingAnswers = (
  params: IGetAllMissingAnswersParams
): UseQueryResult<IGetAllMissingAnswersResponse> => {
  const query = useQuery({
    queryKey: [MISSING_ANSWER_QUERY_KEY.getAll, params],
    queryFn: async () => {
      const response = await missingAnswerService.getAll(params);
      return response;
    },
  });

  return query;
};
