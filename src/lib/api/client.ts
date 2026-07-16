import { useAuthStore } from "@/store/authStore";
import type { ApiResponse } from "@/types/api.type";
import { ApiError } from "./error";

// 백엔드 배포 주소 (NEXT_PUBLIC_API_BASE_URL, 프로토콜 포함해서 .env에 설정). 없으면 이 앱 자기 자신(상대경로)으로 요청
export const API_BASE_URL = process.env.NEXT_PUBLIC_API_BASE_URL ?? "";

async function doFetch(url: string, init: RequestInit, token?: string): Promise<Response> {
  return fetch(url, {
    ...init,

    headers: {
      "Content-Type": "application/json",
      ...(token ? { Authorization: `Bearer ${token}` } : {}),
      ...(init.headers as Record<string, string>),
    },
  });
}

// api 연동 상태 -> 콘솔 로그 남기도록(공통화)
export function logApiSuccess(method: string, url: string, data: unknown) {
  console.log(`[API] ${method} ${url} 성공`, data);
}

export function logApiError(
  method: string,
  url: string,
  status: number,
  errorCode: string,
  message: string
) {
  console.error(
    `[API] ${method} ${url} 실패 - status: ${status}, code: ${errorCode}, message: ${message}`
  );
}

export async function apiRequest<T>(
  url: string,
  options: { method?: string; body?: unknown } = {}
): Promise<T> {
  const method = options.method ?? "GET";
  const token = useAuthStore.getState().accessToken ?? undefined;

  const init: RequestInit = {
    method,
    credentials: "include",
    ...(options.body !== undefined ? { body: JSON.stringify(options.body) } : {}),
  };

  let res = await doFetch(`${API_BASE_URL}/api${url}`, init, token);

  if (res.status === 401) {
    try {
      const reissueRes = await fetch(`${API_BASE_URL}/api/auth/reissue`, {
        method: "POST",
        credentials: "include",
      });

      if (!reissueRes.ok) throw new Error();
      const reissueJson: ApiResponse<{ accessToken: string }> = await reissueRes.json();
      if (!reissueJson.success || !reissueJson.data) throw new Error();

      useAuthStore.getState().setAccessToken(reissueJson.data.accessToken);
      res = await doFetch(`${API_BASE_URL}/api${url}`, init, reissueJson.data.accessToken);
    } catch {
      useAuthStore.getState().clearAuth();
      window.location.href = "/login";
      const error = new ApiError({
        status: 401,
        errorCode: "AUTH_001",
        message: "인증이 만료되었습니다.",
      });
      logApiError(method, url, error.status, error.errorCode, error.message);
      throw error;
    }
  }

  const json: ApiResponse<T> = await res.json().catch(() => ({
    success: false,
    data: null,
    error: { status: res.status, code: "COMMON_001", message: res.statusText },
  }));

  if (!res.ok || !json.success || json.error) {
    const error = new ApiError({
      status: json.error?.status ?? res.status,
      errorCode: json.error?.code ?? "COMMON_001",
      message: json.error?.message ?? res.statusText,
      errors: json.error?.errors,
    });
    logApiError(method, url, error.status, error.errorCode, error.message);
    throw error;
  }

  logApiSuccess(method, url, json.data);
  return json.data as T;
}
