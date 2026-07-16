import type {
  SendEmailCodeRequest,
  SendEmailCodeResponse,
  GoogleOAuthTokenRequest,
  GoogleOAuthTokenResponse,
  GoogleSignupRequest,
  GoogleSignupResponse,
  ReissueResponse,
  MeResponse,
  LogoutResponse,
  VerifyEmailCodeRequest,
  VerifyEmailCodeResponse,
  SignupRequest,
  SignupResponse,
  LoginRequest,
  LoginResponse,
} from "@/types/auth.type";

import type { ApiResponse } from "@/types/api.type";
import { API_BASE_URL, apiRequest, logApiError, logApiSuccess } from "./client";
import { ApiError } from "./error";

//이메일 인증코드
export function sendEmailCode(body: SendEmailCodeRequest) {
  return apiRequest<SendEmailCodeResponse>("/auth/email/send", {
    method: "POST",
    body,
  });
}

//이메일 인증코드 검증
export function verifyEmailCode(body: VerifyEmailCodeRequest) {
  return apiRequest<VerifyEmailCodeResponse>("/auth/email/verify", {
    method: "POST",
    body,
  });
}

//일반 회원가입
export function signup(body: SignupRequest) {
  return apiRequest<SignupResponse>("/auth/signup", {
    method: "POST",
    body,
  });
}

//구글 로그인
export function exchangeGoogleOAuthCode(body: GoogleOAuthTokenRequest) {
  return apiRequest<GoogleOAuthTokenResponse>("/auth/oauth/token", {
    method: "POST",
    body,
  });
}

export function signupWithGoogle(body: GoogleSignupRequest) {
  return apiRequest<GoogleSignupResponse>("/auth/oauth/google/signup", {
    method: "POST",
    body,
  });
}

// 성공 시 JSON이 아니라 Google 로그인 페이지로 302 리다이렉트되는 GET 엔드포인트라
// apiRequest(fetch)로 호출하지 않고 window.location.href로 직접 이동시켜야 함
export function getGoogleLoginUrl(redirectUri?: string) {
  const query = redirectUri ? `?redirectUri=${encodeURIComponent(redirectUri)}` : "";
  return `${API_BASE_URL}/api/auth/oauth/google${query}`;
}

// 앱 마운트 시 RT 쿠키로 AT 재발급 시도용. apiRequest를 쓰면 401일 때 /login으로
// 강제 이동시키는 로직이 같이 딸려오므로(비로그인 사용자까지 튕겨나감), 여기서는
// 실패해도 조용히 넘어가도록 apiRequest를 거치지 않고 직접 호출한다.
export async function reissue(): Promise<ReissueResponse> {
  const url = "/auth/reissue";
  const res = await fetch(`${API_BASE_URL}/api${url}`, {
    method: "POST",
    credentials: "include",
  });

  const json: ApiResponse<ReissueResponse> = await res.json().catch(() => ({
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
    logApiError("POST", url, error.status, error.errorCode, error.message);
    throw error;
  }

  logApiSuccess("POST", url, json.data);
  return json.data as ReissueResponse;
}

//내 정보 조회 (로그인 성공 후 사용자 정보 확인, 새로고침 후 상태 복구용)
export function getMe() {
  return apiRequest<MeResponse>("/users/me");
}

//로그아웃
export function logout() {
  return apiRequest<LogoutResponse>("/auth/logout", { method: "POST" });
}
