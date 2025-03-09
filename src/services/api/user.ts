import axios from "axios";
import {
  ICreateUserParams,
  ICreateUserResponse,
  IDeleteUserParams,
  IDeleteUserResponse,
  IGetAllUsersParams,
  IGetAllUsersResponse,
  IGetUserDetailParams,
  IGetUserDetailResponse,
  IUpdateUserParams,
  IUpdateUserResponse,
} from "@/types/user";

export const userService = {
  getAll: async (params: IGetAllUsersParams): Promise<IGetAllUsersResponse> => {
    const { data: response } = await axios.get<IGetAllUsersResponse>(
      `/api/users?limit=${params.limit}&page=${params.page}`
    );

    if (!response.status) {
      throw new Error(response.message);
    }

    return response;
  },
  getOne: async (
    params: IGetUserDetailParams
  ): Promise<IGetUserDetailResponse> => {
    const { data: response } = await axios.get<IGetUserDetailResponse>(
      `/api/users/${params.id}`
    );

    if (!response.status) {
      throw new Error(response.message);
    }

    return response;
  },
  create: async (data: ICreateUserParams): Promise<ICreateUserResponse> => {
    const { data: response } = await axios.post<ICreateUserResponse>(
      `/api/users`,
      data
    );

    if (!response.status) {
      throw new Error(response.message);
    }

    return response;
  },
  update: async (data: IUpdateUserParams): Promise<IUpdateUserResponse> => {
    const { id, ...rest } = data;
    const { data: response } = await axios.put<IUpdateUserResponse>(
      `/api/users/${id}`,
      rest
    );

    if (!response.status) {
      throw new Error(response.message);
    }

    return response;
  },
  delete: async (params: IDeleteUserParams): Promise<IDeleteUserResponse> => {
    const { data: response } = await axios.delete<IDeleteUserResponse>(
      `/api/users/${params.id}`
    );

    if (!response.status) {
      throw new Error(response.message);
    }

    return response;
  },
};
