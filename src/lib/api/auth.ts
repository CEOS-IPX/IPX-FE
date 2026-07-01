import type { SendEmailCodeRequest, SendEmailCodeResponse } from "@/types/auth.type";
import { apiRequest } from "./client";

export function sendEmailCode(body: SendEmailCodeRequest) {
  return apiRequest<SendEmailCodeResponse>("/auth/email/send", {
    method: "POST",
    body,
  });
}
