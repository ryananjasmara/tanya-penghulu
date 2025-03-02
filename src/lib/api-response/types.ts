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
  error?: unknown;
};

export type ApiResponseParams<T> = {
  status?: boolean;
  message: string;
  data?: T | null;
  meta?: PaginationMeta;
  error?: unknown;
  statusCode?: number;
  headers?: Record<string, string>;
};
