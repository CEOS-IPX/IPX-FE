import { useAuthStore } from "@/store/authStore";
import { ApiError } from "./error";

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

  let res = await doFetch(`/api${url}`, init, token);

  if (res.status === 401) {
    try {
      const reissueRes = await fetch("/api/auth/reissue", {
        method: "POST",
        credentials: "include",
      });
      if (!reissueRes.ok) throw new Error();
      const { data } = await reissueRes.json();
      useAuthStore.getState().setAccessToken(data.accessToken);
      res = await doFetch(`/api${url}`, init, data.accessToken);
    } catch {
      useAuthStore.getState().clearAuth();
      window.location.href = "/login";
      throw new ApiError({ status: 401, errorCode: "AUTH_001", message: "인증이 만료되었습니다." });
    }
  }

  if (!res.ok) {
    const errorData = await res.json().catch(() => ({ message: res.statusText }));
    throw new ApiError({
      status: res.status,
      errorCode: errorData.errorCode ?? "COMMON_001",
      message: errorData.message ?? res.statusText,
    });
  }

  return res.json();
}
