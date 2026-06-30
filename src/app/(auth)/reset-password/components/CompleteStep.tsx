"use client";

import { useRouter } from "next/navigation";
import { Button } from "@/components/ui/Button";

export function CompleteStep() {
  const router = useRouter();

  return (
    <div className="flex max-w-125 flex-1 flex-col items-start justify-center gap-10 self-stretch">
      <div className="flex w-full flex-col items-start gap-2">
        <h1 className="text-headline-emphasis-28 text-title-primary">비밀번호가 변경되었습니다</h1>
        <p className="text-body-19 text-body-disabled">새로운 비밀번호로 다시 로그인해주세요</p>
      </div>
      <Button variant="primary" onClick={() => router.push("/login")}>
        로그인
      </Button>
    </div>
  );
}
