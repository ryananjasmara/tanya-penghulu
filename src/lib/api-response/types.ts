export type PaginationMeta = {
  total: number;
  page: number;
  limit: number;
  totalPages: number;
};

export type ApiResponse<T> = {
  status: boolean;
  message: string;
  data: T | null;
  meta?: PaginationMeta;
  error?: any;
};

export type ApiResponseParams<T> = {
  status?: boolean;
  message: string;
  data?: T | null;
  meta?: PaginationMeta;
  error?: any;
  statusCode?: number;
  headers?: Record<string, string>;
};
