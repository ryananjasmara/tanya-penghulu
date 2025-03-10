import { IUser } from "./user";

export interface ILog {
  id: string;
  action: string;
  description: string;
  ipAddress: string;
  type: string;
  createdAt: Date;
  user: IUser | null;
}

export interface IGetLogsResponse {
  status: boolean;
  message: string;
  data: ILog[];
  meta: {
    total: number;
    page: number;
    limit: number;
    totalPages: number;
  };
}

export interface IGetLogsParams {
  page: number;
  limit: number;
}
