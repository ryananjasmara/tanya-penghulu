import {
  ICreateVoteParams,
  ICreateVoteResponse,
  IGetAllVotesResponse,
} from "@/types/vote";
import {
  useMutation,
  UseMutationResult,
  UseQueryResult,
} from "@tanstack/react-query";

import { IGetAllVotesParams } from "@/types/vote";
import { useQuery } from "@tanstack/react-query";
import { voteService } from "../api";

const VOTE_QUERY_KEY = {
  getAll: "vote.getAll",
  create: "vote.create",
} as const;

export const useGetAllVotes = (
  params: IGetAllVotesParams
): UseQueryResult<IGetAllVotesResponse> => {
  const query = useQuery({
    queryKey: [VOTE_QUERY_KEY.getAll],
    queryFn: async () => {
      const response = await voteService.getAll(params);
      return response;
    },
  });

  return query;
};

export const useCreateVote = (): UseMutationResult<
  ICreateVoteResponse,
  unknown,
  ICreateVoteParams,
  unknown
> => {
  const mutation = useMutation<
    ICreateVoteResponse,
    unknown,
    ICreateVoteParams,
    unknown
  >({
    mutationKey: [VOTE_QUERY_KEY.create],
    mutationFn: async (data: ICreateVoteParams) => {
      const response = await voteService.create(data);
      return response;
    },
    onError: (error: unknown) => {
      throw error;
    },
    retry: 0,
  });

  return mutation;
};
