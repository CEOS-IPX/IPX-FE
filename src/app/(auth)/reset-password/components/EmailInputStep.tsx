"use client";

import { zodResolver } from "@hookform/resolvers/zod";
import { useState } from "react";
import { useForm } from "react-hook-form";
import { z } from "zod";
import { Button } from "@/components/ui/Button";
import { TextField } from "@/components/ui/TextField";
import { sendEmailCode } from "@/lib/api/auth";
import { ApiError } from "@/lib/api/error";
import { EMAIL_VERIFICATION_PURPOSE } from "@/types/auth.type";

const schema = z.object({
  email: z.email("올바른 이메일 형식인지 확인해주세요"),
});

type FormValues = z.infer<typeof schema>;

// error.code 기준으로 분기 (message 기준 아님)
const ERROR_MESSAGES: Record<string, string> = {
  C001: "이메일 형식을 다시 확인해주세요.",
  A001: "가입되지 않은 이메일입니다.",
  A016: "소셜 로그인 계정은 비밀번호 재설정이 불가능합니다.",
  A011: "잠시 후 다시 시도해주세요.",
  A012: "이메일 발송에 실패했습니다. 잠시 후 다시 시도해주세요.",
  C003: "서버 오류가 발생했습니다. 잠시 후 다시 시도해주세요.",
};

interface Props {
  onNext: (email: string, expiresIn: number, resendAvailableIn: number) => void;
  onPrev: () => void;
}

export function EmailInputStep({ onNext, onPrev }: Props) {
  const {
    register,
    handleSubmit,
    watch,
    setError,
    formState: { errors, isSubmitting },
  } = useForm<FormValues>({
    resolver: zodResolver(schema),
    defaultValues: { email: "" },
    mode: "onSubmit",
  });

  const [submitError, setSubmitError] = useState<string | null>(null);

  const email = watch("email");

  const onSubmit = handleSubmit(async (data) => {
    setSubmitError(null);
    try {
      const result = await sendEmailCode({
        email: data.email,
        purpose: EMAIL_VERIFICATION_PURPOSE.RESET_PASSWORD,
      });
      onNext(result.email, result.expiresIn, result.resendAvailableIn);
    } catch (err) {
      if (err instanceof ApiError) {
        if (err.errorCode === "A001") {
          setError("email", { message: ERROR_MESSAGES.A001 });
          return;
        }
        setSubmitError(ERROR_MESSAGES[err.errorCode] ?? err.message);
        return;
      }
      setSubmitError("네트워크 오류가 발생했습니다. 잠시 후 다시 시도해주세요.");
    }
  });

  return (
    <div className="flex max-w-125 flex-1 flex-col items-start justify-center gap-10 self-stretch">
      <div className="flex flex-col gap-2">
        <h1 className="text-headline-emphasis-28 text-title-secondary">비밀번호 재설정</h1>
        <h2 className="text-body-19 text-body-disabled">
          이메일로 새 비밀번호를 설정할 수 있는 링크가 전송됩니다
        </h2>
      </div>
      <form className="flex w-full flex-col gap-10" onSubmit={onSubmit} noValidate>
        <TextField
          label="이메일"
          type="email"
          placeholder="이메일을 입력해주세요"
          {...register("email")}
          error={errors.email?.message}
        />
        {submitError && <p className="text-body-13 text-error-default">{submitError}</p>}
        <div className="flex flex-row gap-3">
          <Button type="button" variant="secondary" onClick={onPrev}>
            이전
          </Button>
          <Button type="submit" disabled={!email || isSubmitting}>
            다음
          </Button>
        </div>
      </form>
    </div>
  );
}
