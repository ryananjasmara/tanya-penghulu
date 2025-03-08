export interface UserData {
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
  data: UserData[];
  metadata: {
    total: number;
    page: number;
    limit: number;
    totalPages: number;
  };
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
  data: UserData;
  error?: unknown;
}
