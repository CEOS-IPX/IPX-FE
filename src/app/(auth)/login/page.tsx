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

const loginSchema = z.object({
  email: z.email("올바른 이메일 형식인지 확인해주세요"),
  password: z.string().min(1, "비밀번호를 입력해주세요"),
});

type LoginErrors = Partial<Record<keyof z.infer<typeof loginSchema>, string>>;

export default function Login() {
  const router = useRouter();
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [errors, setErrors] = useState<LoginErrors>({});

  const handleSubmit = (e: React.FormEvent) => {
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
    //router.push(`/signup/verify?email=${encodeURIComponent(email)}`);
    // 로그인 성공 시 이동할 페이지 추가 예정
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
                <Radio /> {/* 로그인 유지 기능은 api 연동 이후 추가 예정 */}
                로그인 유지
              </label>
              <Link href="/reset-password" className="text-body-15 text-body-disabled underline">
                비밀번호를 잊으셨나요?
              </Link>
            </div>
            <Button type="submit" disabled={!email || !password}>
              로그인
            </Button>
          </form>
          <Divider>또는</Divider>
          <GoogleButton>Google 계정으로 로그인</GoogleButton>
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
