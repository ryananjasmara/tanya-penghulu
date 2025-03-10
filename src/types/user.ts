export interface IUser {
  id: string;
  name: string;
  email: string;
  username: string;
  role: "ADMIN" | "STAFF";
  isActive: boolean;
  createdAt: string;
  updatedAt: string;
}

export interface IGetAllUsersParams {
  page: number;
  limit: number;
}

export interface IGetAllUsersResponse {
  status: boolean;
  message: string;
  data: IUser[];
  meta: {
    total: number;
    page: number;
    limit: number;
    totalPages: number;
  };
  error?: unknown;
}

export interface ICreateUserParams {
  name: string;
  email: string;
  username: string;
  password: string;
  role: "ADMIN" | "STAFF";
}

export interface ICreateUserResponse {
  status: boolean;
  message: string;
  data: IUser;
  error?: unknown;
}

export interface IUpdateUserParams {
  id: string;
  name?: string;
  email?: string;
  username?: string;
  role?: "ADMIN" | "STAFF";
  password?: string;
}

export interface IUpdateUserResponse {
  status: boolean;
  message: string;
  data: IUser;
  error?: unknown;
}

export interface IGetUserDetailParams {
  id: string;
}

export interface IGetUserDetailResponse {
  status: boolean;
  message: string;
  data: IUser;
  error?: unknown;
}

export interface IDeleteUserParams {
  id: string;
}

export interface IDeleteUserResponse {
  status: boolean;
  message: string;
  error?: unknown;
}

export interface IChangePasswordParams {
  id: string;
  currentPassword: string;
  newPassword: string;
}

export interface IChangePasswordResponse {
  status: boolean;
  message: string;
  error?: unknown;
}
