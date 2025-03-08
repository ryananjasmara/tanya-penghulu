import axios from "axios";
import { ICreateUserParams, ICreateUserResponse, IGetAllUsersParams, IGetAllUsersResponse } from "@/types/user";

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
};
