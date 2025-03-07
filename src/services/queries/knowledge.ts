import { useQuery, UseQueryResult } from "@tanstack/react-query";
import { knowledgeService } from "../api";
import { IGetAllKnowledgeParams, IKnowledge } from "@/types/knowledge";

export const KNOWLEDGE_QUERY_KEY = {
  getAll: "knowledges.getAll",
} as const;

export const useGetAllKnowledge = (
  params: IGetAllKnowledgeParams
): UseQueryResult<IKnowledge[]> => {
  const query = useQuery({
    queryKey: [KNOWLEDGE_QUERY_KEY.getAll, params],
    queryFn: async () => {
      const response = await knowledgeService.getAll(params);
      return response.data;
    },
  });

  return query;
};
