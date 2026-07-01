import type { SIGNUP_STEPS } from "@/constants/signup/funnel";

type EmailInputContext = {
  email?: string;
};

type EmailSentContext = {
  email: string;
  expiresIn: number;
  resendAvailableIn: number;
};

type ProfileContext = {
  email: string;
};

type CompleteContext = {
  email: string;
};

export type SignupFunnelSteps = {
  [SIGNUP_STEPS.EMAIL_INPUT]: EmailInputContext;
  [SIGNUP_STEPS.EMAIL_SENT]: EmailSentContext;
  [SIGNUP_STEPS.PROFILE]: ProfileContext;
  [SIGNUP_STEPS.COMPLETE]: CompleteContext;
};
