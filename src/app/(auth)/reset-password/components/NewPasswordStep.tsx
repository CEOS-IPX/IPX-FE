"use client";

import { zodResolver } from "@hookform/resolvers/zod";
import { useState } from "react";
import { useForm } from "react-hook-form";
import { z } from "zod";
import { PasswordField } from "@/components/auth/PasswordField";
import { Button } from "@/components/ui/Button";
import { resetPassword } from "@/lib/api/auth";
import { ApiError } from "@/lib/api/error";

const PASSWORD_REGEX = /^(?=.*[A-Za-z])(?=.*\d)(?=.*[^A-Za-z0-9]).{8,}$/;

const schema = z
  .object({
    password: z.string().regex(PASSWORD_REGEX, "문자, 숫자, 기호 조합 8자 이상 입력해주세요"),
    passwordConfirm: z.string().min(1, "비밀번호를 다시 입력해주세요"),
  })
  .refine((d) => d.password === d.passwordConfirm, {
    message: "비밀번호를 다시 확인해주세요",
    path: ["passwordConfirm"],
  });

type FormValues = z.infer<typeof schema>;

// error.code 기준으로 분기 (message 기준 아님)
const ERROR_MESSAGES: Record<string, string> = {
  C001: "잘못된 입력값입니다.",
  AU010: "유효하지 않거나 만료된 비밀번호 재설정 토큰입니다.",
  AU013: "사용자를 찾을 수 없습니다.",
  AU014: "소셜 로그인 계정은 비밀번호를 재설정할 수 없습니다.",
  AU015: "비활성화된 계정입니다.",
  C002: "서버 내부 오류가 발생했습니다.",
};

interface Props {
  verificationToken: string;
  onNext: () => void;
  onPrev: () => void;
}

export function NewPasswordStep({ verificationToken, onNext, onPrev }: Props) {
  const {
    register,
    handleSubmit,
    setError,
    watch,
    formState: { errors, isSubmitting },
  } = useForm<FormValues>({
    resolver: zodResolver(schema),
    defaultValues: { password: "", passwordConfirm: "" },
    mode: "onSubmit",
  });

  const [submitError, setSubmitError] = useState<string | null>(null);

  const { password, passwordConfirm } = watch();

  const onSubmit = handleSubmit(async (data) => {
    setSubmitError(null);
    try {
      await resetPassword({
        verificationToken,
        newPassword: data.password,
        newPasswordConfirm: data.passwordConfirm,
      });
      onNext();
    } catch (err) {
      if (err instanceof ApiError) {
        if (err.errorCode === "AU002") {
          setError("passwordConfirm", { message: "비밀번호와 비밀번호 확인이 일치하지 않습니다." });
          return;
        }
        if (err.errorCode === "AU011") {
          setError("password", { message: "비밀번호 형식이 올바르지 않습니다." });
          return;
        }
        if (err.errorCode === "AU012") {
          setError("password", {
            message: "기존 비밀번호와 동일한 비밀번호는 사용할 수 없습니다.",
          });
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
        <h2 className="text-body-19 text-body-disabled">새로운 비밀번호를 입력해주세요</h2>
      </div>
      <form className="flex w-full flex-col gap-10" onSubmit={onSubmit} noValidate>
        <div className="flex w-full flex-col items-start gap-4">
          <PasswordField
            label="새 비밀번호"
            placeholder="문자, 숫자, 기호 조합 8자 이상"
            {...register("password")}
            error={errors.password?.message}
          />
          <PasswordField
            label="새 비밀번호 확인"
            placeholder="비밀번호를 다시 입력해주세요"
            {...register("passwordConfirm")}
            error={errors.passwordConfirm?.message}
          />
        </div>
        {submitError && <p className="text-body-13 text-error-default">{submitError}</p>}
        <div className="flex w-full gap-3">
          <Button type="button" variant="secondary" onClick={onPrev}>
            이전
          </Button>
          <Button
            type="submit"
            variant="primary"
            disabled={!password || !passwordConfirm || isSubmitting}
          >
            재설정
          </Button>
        </div>
      </form>
    </div>
  );
}
