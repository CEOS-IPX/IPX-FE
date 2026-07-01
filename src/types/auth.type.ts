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
  expiresIn: number;
  resendAvailableIn: number;
};
