import { NextResponse } from "next/server";
import { ApiResponseParams, ApiResponse } from "./types";

export function apiResponse<T>({
  status = true,
  message,
  data = null,
  meta,
  error,
  statusCode = 200,
}: ApiResponseParams<T>) {
  const response: ApiResponse<T> = {
    status,
    message,
    data,
  };

  if (meta) {
    response.meta = meta;
  }

  if (error) {
    response.error = error;
  }

  return NextResponse.json(response, { status: statusCode });
}

export * from "./types";
