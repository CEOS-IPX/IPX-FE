"use client";

import { zodResolver } from "@hookform/resolvers/zod";
import { Controller, useForm } from "react-hook-form";
import { z } from "zod";

import { AgreementItem } from "@/components/auth/AgreementItem";
import { PasswordField } from "@/components/auth/PasswordField";
import { Button } from "@/components/ui/Button";
import { TextField } from "@/components/ui/TextField";

const PASSWORD_REGEX = /^(?=.*[A-Za-z])(?=.*\d)(?=.*[^A-Za-z0-9]).{8,}$/;

const schema = z
  .object({
    name: z.string().trim().min(1, "이름은 필수 입력 항목입니다."),
    password: z.string().regex(PASSWORD_REGEX, "비밀번호 형식이 올바르지 않습니다"),
    passwordConfirm: z.string(),
    company: z.string().optional(),
    agreedTerms: z.boolean().refine((v) => v, { message: "*가입약관에 동의해주세요." }),
    agreedPrivacy: z.boolean().refine((v) => v, { message: "*가입약관에 동의해주세요." }),
  })
  .refine((d) => d.password === d.passwordConfirm, {
    message: "비밀번호가 불일치합니다.",
    path: ["passwordConfirm"],
  });

export type ProfileFormValues = z.infer<typeof schema>;

type ProfileStepProps = {
  onSubmit: (values: ProfileFormValues) => void;
  onBack: () => void;
};

export const ProfileStep = ({ onSubmit, onBack }: ProfileStepProps) => {
  const {
    register,
    control,
    handleSubmit,
    formState: { errors },
  } = useForm<ProfileFormValues>({
    resolver: zodResolver(schema),
    defaultValues: {
      name: "",
      password: "",
      passwordConfirm: "",
      company: "",
      agreedTerms: false,
      agreedPrivacy: false,
    },
    mode: "onSubmit",
  });

  const agreementError = errors.agreedTerms ?? errors.agreedPrivacy;

  return (
    <form
      onSubmit={handleSubmit(onSubmit)}
      className="flex max-w-125 flex-1 flex-col items-start justify-center gap-10 self-stretch"
    >
      <h1 className="text-headline-emphasis-28 text-gray-10">회원 정보</h1>
      <div className="flex w-full flex-col items-start gap-4">
        <TextField
          label="이름"
          placeholder="이름을 입력해주세요"
          {...register("name")}
          error={errors.name?.message}
        />
        <PasswordField
          label="비밀번호"
          placeholder="문자, 숫자, 기호 조합 8자 이상"
          {...register("password")}
          error={errors.password?.message}
        />
        <PasswordField
          label="비밀번호 확인"
          placeholder="비밀번호를 다시 입력해주세요"
          {...register("passwordConfirm")}
          error={errors.passwordConfirm?.message}
        />
        <TextField
          label="회사명 (선택)"
          placeholder="회사명을 입력해주세요 (선택)"
          {...register("company")}
        />
      </div>
      <div className="flex w-full flex-col items-start gap-3">
        <div className="flex h-5 items-center gap-2">
          <p className="text-label-13 text-gray-10">가입 약관 동의</p>
          {agreementError && (
            <p className="text-label-13 text-error-20">{agreementError.message}</p>
          )}
        </div>
        <hr className="h-px w-full border-0 bg-gray-80" />
        <Controller
          control={control}
          name="agreedTerms"
          render={({ field: { value, onChange } }) => (
            <AgreementItem
              required
              label="IPX의 이용약관에 동의합니다"
              checked={value}
              onToggle={() => onChange(!value)}
            />
          )}
        />
        <Controller
          control={control}
          name="agreedPrivacy"
          render={({ field: { value, onChange } }) => (
            <AgreementItem
              required
              label="개인정보처리 방침에 동의합니다"
              checked={value}
              onToggle={() => onChange(!value)}
            />
          )}
        />
      </div>
      <div className="flex w-full gap-3">
        <Button variant="secondary" type="button" onClick={onBack}>
          이전
        </Button>
        <Button variant="primary" type="submit">
          가입
        </Button>
      </div>
    </form>
  );
};
