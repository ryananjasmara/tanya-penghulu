import axios from "axios";
import { IGetAllUsersParams, IGetAllUsersResponse } from "@/types/user";

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
};
