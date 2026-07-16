"use client";

import Link from "next/link";
import { useRouter } from "next/navigation";
import { useState } from "react";
import { z } from "zod";
import { PasswordField } from "@/components/auth/PasswordField";
import { Radio } from "@/components/ui/Radio";
import { GoogleButton } from "@/components/auth/GoogleButton";
import { Button } from "@/components/ui/Button";
import { Divider } from "@/components/ui/Divider";
import { TextField } from "@/components/ui/TextField";
import { getGoogleLoginUrl, login } from "@/lib/api/auth";
import { ApiError } from "@/lib/api/error";
import { useAuthStore } from "@/store/authStore";

const loginSchema = z.object({
  email: z.email("올바른 이메일 형식인지 확인해주세요"),
  password: z.string().min(1, "비밀번호를 입력해주세요"),
});

type LoginErrors = Partial<Record<keyof z.infer<typeof loginSchema>, string>>;

// 이 스펙은 error.code 없이 status만 내려주므로 status 기준으로 분기한다.
const STATUS_MESSAGES: Record<number, string> = {
  400: "이메일 형식이 올바르지 않거나 필수값이 누락되었습니다.",
  401: "이메일 또는 비밀번호가 일치하지 않습니다.",
  403: "비활성화되었거나 탈퇴한 계정입니다.",
  500: "서버 오류가 발생했습니다. 잠시 후 다시 시도해주세요.",
};

export default function Login() {
  const router = useRouter();
  const setAuth = useAuthStore((s) => s.setAuth);
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [rememberMe, setRememberMe] = useState(false);
  const [errors, setErrors] = useState<LoginErrors>({});
  const [submitError, setSubmitError] = useState<string | null>(null);
  const [isSubmitting, setIsSubmitting] = useState(false);

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    const result = loginSchema.safeParse({ email, password });
    if (!result.success) {
      const fieldErrors: LoginErrors = {};

      for (const issue of result.error.issues) {
        const field = issue.path[0] as keyof LoginErrors;
        fieldErrors[field] = issue.message;
      }
      setErrors(fieldErrors);
      return;
    }
    setErrors({});
    setSubmitError(null);
    setIsSubmitting(true);

    try {
      const data = await login({ email, password, rememberMe });
      setAuth(data.accessToken, data.user);
      router.replace("/search");
    } catch (err) {
      setSubmitError(
        err instanceof ApiError
          ? (STATUS_MESSAGES[err.status] ?? err.message)
          : "네트워크 오류가 발생했습니다. 잠시 후 다시 시도해주세요."
      );
    } finally {
      setIsSubmitting(false);
    }
  };

  const handleGoogleLogin = () => {
    const callbackUrl = `${window.location.origin}/oauth/google/callback`;
    window.location.href = getGoogleLoginUrl(callbackUrl);
  };

  return (
    <div className="flex max-w-125 flex-1 flex-col items-start justify-center gap-10 self-stretch">
      <h1 className="text-headline-emphasis-28 text-title-primary">로그인</h1>

      <div className="flex w-full flex-col items-start gap-6">
        <div className="flex w-full flex-col items-start gap-7">
          <form className="flex w-full flex-col gap-6" onSubmit={handleSubmit} noValidate>
            <div className="flex w-full flex-col gap-4">
              <TextField
                label="이메일"
                type="email"
                placeholder="이메일을 입력해주세요"
                value={email}
                onChange={(e) => {
                  setEmail(e.target.value);
                  if (errors.email) setErrors((prev) => ({ ...prev, email: undefined }));
                }}
                error={errors.email}
              />

              <PasswordField
                label="비밀번호"
                placeholder="비밀번호를 입력해주세요"
                value={password}
                onChange={(e) => {
                  setPassword(e.target.value);
                  if (errors.password) setErrors((prev) => ({ ...prev, password: undefined }));
                }}
                error={errors.password}
              />
            </div>

            <div className="w-full flex flex-row justify-between">
              <label className="flex items-center gap-2 text-label-15 text-title-secondary">
                <Radio checked={rememberMe} onChange={(e) => setRememberMe(e.target.checked)} />
                로그인 유지
              </label>

              <Link href="/reset-password" className="text-body-15 text-body-disabled underline">
                비밀번호를 잊으셨나요?
              </Link>
            </div>

            {submitError && <p className="text-body-13 text-error-default">{submitError}</p>}

            <Button type="submit" disabled={!email || !password || isSubmitting}>
              로그인
            </Button>
          </form>

          <Divider>또는</Divider>
          <GoogleButton onClick={handleGoogleLogin}>Google 계정으로 로그인</GoogleButton>
        </div>

        <div className="flex h-6 w-full items-center justify-center gap-2">
          <span className="text-label-15 text-body-disabled">계정이 없으신가요?</span>
          <Link href="/signup" className="text-label-15 font-normal text-body-disabled underline">
            회원가입하기
          </Link>
        </div>
      </div>
    </div>
  );
}
