"use client";

import { zodResolver } from "@hookform/resolvers/zod";
import { useForm } from "react-hook-form";
import { z } from "zod";
import { Button } from "@/components/ui/Button";
import { TextField } from "@/components/ui/TextField";

const schema = z.object({
  email: z.email("올바른 이메일 형식인지 확인해주세요"),
});

type FormValues = z.infer<typeof schema>;

interface Props {
  onNext: (email: string) => void;
  onPrev: () => void;
}

export function EmailInputStep({ onNext, onPrev }: Props) {
  const {
    register,
    handleSubmit,
    watch,
    formState: { errors },
  } = useForm<FormValues>({
    resolver: zodResolver(schema),
    defaultValues: { email: "" },
    mode: "onSubmit",
  });

  const email = watch("email");

  return (
    <div className="flex max-w-125 flex-1 flex-col items-start justify-center gap-10 self-stretch">
      <div className="flex flex-col gap-2">
        <h1 className="text-headline-emphasis-28 text-title-secondary">비밀번호 재설정</h1>
        <h2 className="text-body-19 text-body-disabled">
          이메일로 새 비밀번호를 설정할 수 있는 링크가 전송됩니다
        </h2>
      </div>
      <form
        className="flex w-full flex-col gap-10"
        onSubmit={handleSubmit((data) => onNext(data.email))}
        noValidate
      >
        <TextField
          label="이메일"
          type="email"
          placeholder="이메일을 입력해주세요"
          {...register("email")}
          error={errors.email?.message}
        />
        <div className="flex flex-row gap-3">
          <Button type="button" variant="secondary" onClick={onPrev}>
            이전
          </Button>
          <Button type="submit" disabled={!email}>
            다음
          </Button>
        </div>
      </form>
    </div>
  );
}
