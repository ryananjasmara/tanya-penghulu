import axios from "axios";
import {
  ICreateKnowledgeParams,
  ICreateKnowledgeResponse,
  IDeleteKnowledgeParams,
  IDeleteKnowledgeResponse,
  IGetAllKnowledgeParams,
  IGetAllKnowledgeResponse,
  IGetKnowledgeDetailParams,
  IGetKnowledgeDetailResponse,
  IUpdateKnowledgeParams,
  IUpdateKnowledgeResponse,
} from "@/types/knowledge";

export const knowledgeService = {
  getAll: async (
    params: IGetAllKnowledgeParams
  ): Promise<IGetAllKnowledgeResponse> => {
    const { data: response } = await axios.get<IGetAllKnowledgeResponse>(
      `/api/knowledges?limit=${params.limit}&page=${params.page}`
    );

    if (!response.status) {
      throw new Error(response.message);
    }

    return response;
  },
  getOne: async (
    params: IGetKnowledgeDetailParams
  ): Promise<IGetKnowledgeDetailResponse> => {
    const { data: response } = await axios.get<IGetKnowledgeDetailResponse>(
      `/api/knowledges/${params.id}`
    );

    if (!response.status) {
      throw new Error(response.message);
    }

    return response;
  },
  create: async (
    params: ICreateKnowledgeParams
  ): Promise<ICreateKnowledgeResponse> => {
    const { data: response } = await axios.post<ICreateKnowledgeResponse>(
      `/api/knowledges`,
      params
    );

    if (!response.status) {
      throw new Error(response.message);
    }

    return response;
  },
  update: async (
    params: IUpdateKnowledgeParams
  ): Promise<IUpdateKnowledgeResponse> => {
    const { id, ...rest } = params;
    const { data: response } = await axios.put<IUpdateKnowledgeResponse>(
      `/api/knowledges/${id}`,
      rest
    );

    if (!response.status) {
      throw new Error(response.message);
    }

    return response;
  },
  delete: async (
    params: IDeleteKnowledgeParams
  ): Promise<IDeleteKnowledgeResponse> => {
    const { data: response } = await axios.delete<IDeleteKnowledgeResponse>(
      `/api/knowledges/${params.id}`
    );

    if (!response.status) {
      throw new Error(response.message);
    }

    return response;
  },
};
