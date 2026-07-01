"use client";

import { zodResolver } from "@hookform/resolvers/zod";
import Link from "next/link";
import { useState } from "react";
import { useForm } from "react-hook-form";
import { z } from "zod";

import { GoogleButton } from "@/components/auth/GoogleButton";
import { Button } from "@/components/ui/Button";
import { Divider } from "@/components/ui/Divider";
import { TextField } from "@/components/ui/TextField";
import { sendEmailCode } from "@/lib/api/auth";
import { ApiError } from "@/lib/api/error";
import { EMAIL_VERIFICATION_PURPOSE } from "@/types/auth.type";

const schema = z.object({
  email: z.email("올바른 이메일 형식인지 확인해주세요"),
});

type FormValues = z.infer<typeof schema>;

type EmailInputStepProps = {
  email?: string;
  onNext: (values: { email: string; expiresIn: number; resendAvailableIn: number }) => void;
};

export const EmailInputStep = ({ email: initialEmail = "", onNext }: EmailInputStepProps) => {
  const {
    register,
    handleSubmit,
    setError,
    formState: { errors, isSubmitting },
  } = useForm<FormValues>({
    resolver: zodResolver(schema),
    defaultValues: { email: initialEmail },
    mode: "onSubmit",
  });

  const [submitError, setSubmitError] = useState<string | null>(null);

  const onSubmit = handleSubmit(async ({ email }) => {
    setSubmitError(null);
    try {
      const data = await sendEmailCode({
        email,
        purpose: EMAIL_VERIFICATION_PURPOSE.SIGNUP,
      });
      onNext({
        email: data.email,
        expiresIn: data.expiresIn,
        resendAvailableIn: data.resendAvailableIn,
      });
    } catch (err) {
      if (err instanceof ApiError) {
        if (err.status === 409) {
          setError("email", { message: "이미 가입된 이메일입니다." });
          return;
        }
        if (err.status === 400) {
          setError("email", { message: err.message });
          return;
        }
        if (err.status === 429) {
          setSubmitError("잠시 후 다시 시도해주세요.");
          return;
        }
        setSubmitError(err.message);
        return;
      }
      setSubmitError("네트워크 오류가 발생했습니다. 잠시 후 다시 시도해주세요.");
    }
  });

  return (
    <div className="flex max-w-125 flex-1 flex-col items-start justify-center gap-10 self-stretch">
      <h1 className="text-headline-emphasis-28 text-title-primary">회원가입</h1>
      <div className="flex w-full flex-col items-start gap-6">
        <div className="flex w-full flex-col items-start gap-7">
          <form className="flex w-full flex-col gap-6" onSubmit={onSubmit} noValidate>
            <TextField
              label="이메일"
              type="email"
              placeholder="이메일을 입력해주세요"
              {...register("email")}
              error={errors.email?.message}
            />
            {submitError && <p className="text-body-13 text-error-default">{submitError}</p>}
            <Button type="submit" disabled={isSubmitting}>
              다음
            </Button>
          </form>
          <Divider>또는</Divider>
          <GoogleButton>Google 계정으로 시작</GoogleButton>
        </div>
        <div className="flex h-6 w-full items-center justify-center gap-2">
          <span className="text-body-15 text-body-disabled">이미 계정이 있으신가요?</span>
          <Link href="/login" className="text-body-15 font-normal text-body-disabled underline">
            로그인하기
          </Link>
        </div>
      </div>
    </div>
  );
};
