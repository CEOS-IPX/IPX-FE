"use client";

import { zodResolver } from "@hookform/resolvers/zod";
import { useEffect } from "react";
import { useForm } from "react-hook-form";
import { z } from "zod";
import { PasswordField } from "@/components/auth/PasswordField";
import { Button } from "@/components/ui/Button";

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

interface Props {
  onNext: (password: string) => void;
  onPrev: () => void;
  passwordError?: string;
}

export function NewPasswordStep({ onNext, onPrev, passwordError }: Props) {
  const {
    register,
    handleSubmit,
    setError,
    formState: { errors },
  } = useForm<FormValues>({
    resolver: zodResolver(schema),
    defaultValues: { password: "", passwordConfirm: "" },
    mode: "onSubmit",
  });

  useEffect(() => {
    if (passwordError) {
      setError("password", { message: passwordError });
    }
  }, [passwordError, setError]);

  return (
    <div className="flex max-w-125 flex-1 flex-col items-start justify-center gap-10 self-stretch">
      <div className="flex flex-col gap-2">
        <h1 className="text-headline-emphasis-28 text-title-secondary">비밀번호 재설정</h1>
        <h2 className="text-body-19 text-body-disabled">새로운 비밀번호를 입력해주세요</h2>
      </div>
      <form
        className="flex w-full flex-col gap-10"
        onSubmit={handleSubmit((data) => onNext(data.password))}
        noValidate
      >
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
        <div className="flex w-full gap-3">
          <Button type="button" variant="secondary" onClick={onPrev}>
            이전
          </Button>
          <Button type="submit" variant="primary">
            재설정
          </Button>
        </div>
      </form>
    </div>
  );
}
