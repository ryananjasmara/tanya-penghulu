import { useQuery, UseQueryResult } from "@tanstack/react-query";
import { userService } from "../api";
import { IGetAllUsersParams, UserData } from "@/types/user";

export const USER_QUERY_KEY = {
  getAll: "users.getAll",
} as const;

export const useGetAllUsers = (
  params: IGetAllUsersParams
): UseQueryResult<UserData[]> => {
  const query = useQuery({
    queryKey: [USER_QUERY_KEY.getAll, params],
    queryFn: async () => {
      const response = await userService.getAll(params);
      return response.data;
    },
  });

  return query;
};
