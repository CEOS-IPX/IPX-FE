import type { ApiResponse } from "@/types/api.type";
import { ApiError } from "@/lib/api/error";

const API_BASE_URL = process.env.NEXT_PUBLIC_API_BASE_URL ?? "/api";

type RequestOptions = {
  method?: "GET" | "POST" | "PUT" | "PATCH" | "DELETE";
  body?: unknown;
  headers?: Record<string, string>;
  signal?: AbortSignal;
};

export async function apiRequest<T>(path: string, options: RequestOptions = {}): Promise<T> {
  const { method = "GET", body, headers, signal } = options;

  const res = await fetch(`${API_BASE_URL}${path}`, {
    method,
    headers: {
      "Content-Type": "application/json",
      ...headers,
    },
    body: body !== undefined ? JSON.stringify(body) : undefined,
    credentials: "include",
    signal,
  });

  const json = (await res.json().catch(() => null)) as ApiResponse<T> | null;

  if (!json) {
    throw new ApiError({
      status: res.status,
      errorCode: "COMMON_002",
      message: "서버 응답을 처리할 수 없습니다.",
    });
  }

  if (!json.success) {
    throw new ApiError({
      status: res.status,
      errorCode: json.errorCode ?? "UNKNOWN",
      message: json.message,
      errors: json.errors,
    });
  }

  return json.data;
}
