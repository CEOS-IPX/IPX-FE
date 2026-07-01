"use client";

import { zodResolver } from "@hookform/resolvers/zod";
import Link from "next/link";
import { useForm } from "react-hook-form";
import { z } from "zod";

import { GoogleButton } from "@/components/auth/GoogleButton";
import { Button } from "@/components/ui/Button";
import { Divider } from "@/components/ui/Divider";
import { TextField } from "@/components/ui/TextField";

const schema = z.object({
  email: z.email("올바른 이메일 형식인지 확인해주세요"),
});

type FormValues = z.infer<typeof schema>;

type EmailInputStepProps = {
  email?: string;
  onNext: (values: { email: string }) => void;
};

export const EmailInputStep = ({ email: initialEmail = "", onNext }: EmailInputStepProps) => {
  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm<FormValues>({
    resolver: zodResolver(schema),
    defaultValues: { email: initialEmail },
    mode: "onSubmit",
  });

  return (
    <div className="flex max-w-125 flex-1 flex-col items-start justify-center gap-10 self-stretch">
      <h1 className="text-headline-emphasis-28 text-gray-10">회원가입</h1>
      <div className="flex w-full flex-col items-start gap-6">
        <div className="flex w-full flex-col items-start gap-7">
          <form className="flex w-full flex-col gap-6" onSubmit={handleSubmit(onNext)} noValidate>
            <TextField
              label="이메일"
              type="email"
              placeholder="이메일을 입력해주세요"
              {...register("email")}
              error={errors.email?.message}
            />
            <Button type="submit">다음</Button>
          </form>
          <Divider>또는</Divider>
          <GoogleButton>Google 계정으로 시작</GoogleButton>
        </div>
        <div className="flex h-6 w-full items-center justify-center gap-2">
          <span className="text-label-15 text-gray-50">이미 계정이 있으신가요?</span>
          <Link href="/login" className="text-label-15 font-normal text-gray-30 underline">
            로그인하기
          </Link>
        </div>
      </div>
    </div>
  );
};
