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

export async function apiRequest<T>(
  url: string,
  options: { method?: string; body?: unknown } = {}
): Promise<T> {
  const token = useAuthStore.getState().accessToken ?? undefined;

  const init: RequestInit = {
    method: options.method ?? "GET",
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
      throw new ApiError({ status: 401, errorCode: "AUTH_001", message: "인증이 만료되었습니다." });
    }
  }

  const json: ApiResponse<T> = await res.json().catch(() => ({
    success: false,
    data: null,
    error: { status: res.status, code: "COMMON_001", message: res.statusText },
  }));

  if (!res.ok || !json.success || json.error) {
    throw new ApiError({
      status: json.error?.status ?? res.status,
      errorCode: json.error?.code ?? "COMMON_001",
      message: json.error?.message ?? res.statusText,
      errors: json.error?.errors,
    });
  }

  return json.data as T;
}
