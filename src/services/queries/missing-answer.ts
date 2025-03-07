import { useMutation, UseMutationResult } from "@tanstack/react-query";
import { missingAnswerService } from "../api";
import { ICreateMissingAnswerParams, ICreateMissingAnswerResponse } from "@/types/missing-answer";

export const MISSING_ANSWER_QUERY_KEY = {
  create: "missing-answers.create",
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