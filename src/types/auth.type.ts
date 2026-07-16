import type { User } from "@/store/authStore";

export const EMAIL_VERIFICATION_PURPOSE = {
  SIGNUP: "SIGNUP",
  RESET_PASSWORD: "RESET_PASSWORD",
} as const;

export type EmailVerificationPurpose =
  (typeof EMAIL_VERIFICATION_PURPOSE)[keyof typeof EMAIL_VERIFICATION_PURPOSE];

export type SendEmailCodeRequest = {
  email: string;
  purpose: EmailVerificationPurpose;
};

export type SendEmailCodeResponse = {
  email: string;
  purpose: string;
  expiresIn: number;
  resendAvailableIn: number;
};

export type VerifyEmailCodeRequest = {
  email: string;
  code: string;
  purpose: EmailVerificationPurpose;
};

export type VerifyEmailCodeResponse = {
  email: string;
  purpose: string;
  verified: boolean;
  verificationToken: string;
};

//구글 로그인 관련 타입 정리~
export type GoogleOAuthTokenRequest = {
  code: string;
};

export type GoogleOAuthLoginSuccess = {
  status: "LOGIN_SUCCESS";
  accessToken: string;
  tokenType: string;
  expiresIn: number;
  user: User;
};

export type GoogleOAuthNeedSignup = {
  status: "NEED_SIGNUP";
  oauthSignupToken: string;
  email: string;
  provider: string;
  name?: string;
};

export type GoogleOAuthTokenResponse = GoogleOAuthLoginSuccess | GoogleOAuthNeedSignup;

export type GoogleSignupRequest = {
  oauthSignupToken: string;
  company?: string;
  termsAgreements: TermsAgreement[];
};

export type GoogleSignupResponse = {
  accessToken: string;
  tokenType: string;
  expiresIn: number;
  user: User;
};

//로그인 관련 타입~
export type ReissueResponse = {
  accessToken: string;
  tokenType: string;
  expiresIn: number;
};

//내 정보 조회 관련 타입~
export type MeResponse = User;

//로그아웃 관련 타입~
export type LogoutResponse = Record<string, never>;

//약관 동의 관련 타입~
export const TERMS_TYPE = {
  SERVICE_TERMS: "SERVICE_TERMS",
  PRIVACY_POLICY: "PRIVACY_POLICY",
  MARKETING: "MARKETING",
} as const;

export type TermsType = (typeof TERMS_TYPE)[keyof typeof TERMS_TYPE];

export type TermsAgreement = {
  type: TermsType;
  agreed: boolean;
};
