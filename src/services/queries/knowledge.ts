import {
  useMutation,
  UseMutationResult,
  useQuery,
  UseQueryResult,
} from "@tanstack/react-query";
import { knowledgeService } from "../api";
import {
  ICreateKnowledgeParams,
  ICreateKnowledgeResponse,
  IDeleteKnowledgeParams,
  IDeleteKnowledgeResponse,
  IGetAllKnowledgeParams,
  IGetAllKnowledgeResponse,
  IGetKnowledgeDetailParams,
  IKnowledge,
  IUpdateKnowledgeParams,
  IUpdateKnowledgeResponse,
} from "@/types/knowledge";

export const KNOWLEDGE_QUERY_KEY = {
  getAll: "knowledges.getAll",
  getOne: "knowledges.getOne",
  create: "knowledges.create",
  update: "knowledges.update",
  delete: "knowledges.delete",
} as const;

export const useGetAllKnowledge = (
  params: IGetAllKnowledgeParams
): UseQueryResult<IGetAllKnowledgeResponse> => {
  const query = useQuery({
    queryKey: [KNOWLEDGE_QUERY_KEY.getAll, params],
    queryFn: async () => {
      const response = await knowledgeService.getAll(params);
      return response;
    },
  });

  return query;
};

export const useGetKnowledgeDetail = (
  params: IGetKnowledgeDetailParams
): UseQueryResult<IKnowledge> => {
  const query = useQuery({
    queryKey: [KNOWLEDGE_QUERY_KEY.getOne, params],
    queryFn: async () => {
      const response = await knowledgeService.getOne(params);
      return response.data;
    },
  });

  return query;
};

export const useCreateKnowledge = (): UseMutationResult<
  ICreateKnowledgeResponse,
  unknown,
  ICreateKnowledgeParams,
  unknown
> => {
  const mutation = useMutation<
    ICreateKnowledgeResponse,
    unknown,
    ICreateKnowledgeParams,
    unknown
  >({
    mutationKey: [KNOWLEDGE_QUERY_KEY.create],
    mutationFn: async (data: ICreateKnowledgeParams) => {
      const response = await knowledgeService.create(data);
      return response;
    },
    onError: (error: unknown) => {
      throw error;
    },
    retry: 0,
  });

  return mutation;
};

export const useUpdateKnowledge = (): UseMutationResult<
  IUpdateKnowledgeResponse,
  unknown,
  IUpdateKnowledgeParams,
  unknown
> => {
  const mutation = useMutation<
    IUpdateKnowledgeResponse,
    unknown,
    IUpdateKnowledgeParams,
    unknown
  >({
    mutationKey: [KNOWLEDGE_QUERY_KEY.update],
    mutationFn: async (data: IUpdateKnowledgeParams) => {
      const response = await knowledgeService.update(data);
      return response;
    },
    onError: (error: unknown) => {
      throw error;
    },
    retry: 0,
  });

  return mutation;
};

export const useDeleteKnowledge = (): UseMutationResult<
  IDeleteKnowledgeResponse,
  unknown,
  IDeleteKnowledgeParams,
  unknown
> => {
  const mutation = useMutation<
    IDeleteKnowledgeResponse,
    unknown,
    IDeleteKnowledgeParams,
    unknown
  >({
    mutationKey: [KNOWLEDGE_QUERY_KEY.delete],
    mutationFn: async (data: IDeleteKnowledgeParams) => {
      const response = await knowledgeService.delete(data);
      return response;
    },
    onError: (error: unknown) => {
      throw error;
    },
    retry: 0,
  });

  return mutation;
};
