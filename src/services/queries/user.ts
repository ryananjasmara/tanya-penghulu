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
  IDeleteUserParams,
  IDeleteUserResponse,
  IGetAllUsersParams,
  IGetAllUsersResponse,
  IGetUserDetailParams,
  IUpdateUserParams,
  IUpdateUserResponse,
  IUser,
} from "@/types/user";

export const USER_QUERY_KEY = {
  getAll: "users.getAll",
  create: "users.create",
  update: "users.update",
  delete: "users.delete",
} as const;

export const useGetAllUsers = (
  params: IGetAllUsersParams
): UseQueryResult<IGetAllUsersResponse> => {
  const query = useQuery({
    queryKey: [USER_QUERY_KEY.getAll, params],
    queryFn: async () => {
      const response = await userService.getAll(params);
      return response;
    },
  });

  return query;
};

export const useGetUserDetail = (
  params: IGetUserDetailParams
): UseQueryResult<IUser> => {
  const query = useQuery({
    queryKey: [USER_QUERY_KEY.getAll, params],
    queryFn: async () => {
      const response = await userService.getOne(params);
      return response.data;
    },
  });

  return query;
};

export const useCreateUser = (): UseMutationResult<
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

export const useUpdateUser = (): UseMutationResult<
  IUpdateUserResponse,
  unknown,
  IUpdateUserParams,
  unknown
> => {
  const mutation = useMutation<
    IUpdateUserResponse,
    unknown,
    IUpdateUserParams,
    unknown
  >({
    mutationKey: [USER_QUERY_KEY.update],
    mutationFn: async (data: IUpdateUserParams) => {
      const response = await userService.update(data);
      return response;
    },
    onError: (error: unknown) => {
      throw error;
    },
    retry: 0,
  });

  return mutation;
};

export const useDeleteUser = (): UseMutationResult<
  IDeleteUserResponse,
  unknown,
  IDeleteUserParams,
  unknown
> => {
  const mutation = useMutation<
    IDeleteUserResponse,
    unknown,
    IDeleteUserParams,
    unknown
  >({
    mutationKey: [USER_QUERY_KEY.delete],
    mutationFn: async (data: IDeleteUserParams) => {
      const response = await userService.delete(data);
      return response;
    },
    onError: (error: unknown) => {
      throw error;
    },
    retry: 0,
  });

  return mutation;
};
