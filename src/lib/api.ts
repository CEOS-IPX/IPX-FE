import axios from "axios";
import { useAuthStore } from "@/store/authStore";

export const api = axios.create({
  baseURL: "/api",
  withCredentials: true, // RT 쿠키를 자동으로 요청에 포함
});

// 요청 인터셉터: 모든 요청 전에 AT를 Authorization 헤더에 붙임
api.interceptors.request.use((config) => {
  const token = useAuthStore.getState().accessToken;
  if (token) {
    config.headers.Authorization = `Bearer ${token}`;
  }
  return config;
});

// 응답 인터셉터-> 401 응답 시 reissue 호출 후 원래 요청 재시도
api.interceptors.response.use(
  (response) => response,
  async (error) => {
    const originalRequest = error.config;

    // 아이디, 비밀번호 불일치 시 로그인 막힘(재시도 여부 플래그로 무한 루프 방지)
    if (error.response?.status === 401 && !originalRequest._retry) {
      originalRequest._retry = true;

      try {
        const { data } = await axios.post(
          "/api/auth/reissue",
          {},
          {
            withCredentials: true,
          }
        );

        const newToken = data.data.accessToken;
        useAuthStore.getState().setAccessToken(newToken);
        originalRequest.headers.Authorization = `Bearer ${newToken}`;
        return api(originalRequest); // 원래 요청 재시도
      } catch {
        // reissue도 실패하면 로그아웃 처리
        useAuthStore.getState().clearAuth();
        window.location.href = "/login";
      }
    }

    return Promise.reject(error);
  }
);
