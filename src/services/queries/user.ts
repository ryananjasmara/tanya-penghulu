import {
  useMutation,
  UseMutationResult,
  useQuery,
  UseQueryResult,
} from "@tanstack/react-query";
import { userService } from "../api";
import {
  ICreateUserParams,
  ICreateUserResponse,
  IGetAllUsersParams,
  UserData,
} from "@/types/user";

export const USER_QUERY_KEY = {
  getAll: "users.getAll",
  create: "users.create",
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

export const usePostContact = (): UseMutationResult<
  ICreateUserResponse,
  unknown,
  ICreateUserParams,
  unknown
> => {
  const mutation = useMutation<
    ICreateUserResponse,
    unknown,
    ICreateUserParams,
    unknown
  >({
    mutationKey: [USER_QUERY_KEY.create],
    mutationFn: async (data: ICreateUserParams) => {
      const response = await userService.create(data);
      return response;
    },
    onError: (error: unknown) => {
      throw error;
    },
    retry: 0,
  });

  return mutation;
};
