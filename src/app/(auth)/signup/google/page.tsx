"use client";

import { useRouter } from "next/navigation";
import { useState } from "react";
import { AgreementItem } from "@/components/auth/AgreementItem";
import { Button } from "@/components/ui/Button";
import { TextField } from "@/components/ui/TextField";

export default function GoogleSignupPage() {
  const router = useRouter();
  const [agreedTerms, setAgreedTerms] = useState(false);
  const [agreedPrivacy, setAgreedPrivacy] = useState(false);

  return (
    <div className="flex max-w-125 flex-1 flex-col items-start justify-center gap-10 self-stretch">
      <h1 className="w-full text-headline-emphasis-28 text-title-primary">회원정보</h1>

      <div className="flex w-full flex-col items-start gap-4">
        <TextField
          label="이름"
          disabled
          className="cursor-default bg-bg-neutral-hover disabled:opacity-100"
        />
        <TextField label="회사명 (선택)" placeholder="회사명을 입력해주세요 (선택)" />
      </div>

      <div className="flex w-full flex-col items-start gap-3">
        <div className="flex h-5 items-center">
          <p className="text-label-13 text-title-secondary">가입 약관 동의</p>
        </div>
        <hr className="h-px w-full border-0 bg-outline-sub" />
        <AgreementItem
          required
          label="IPX의 이용약관에 동의합니다"
          checked={agreedTerms}
          onToggle={() => setAgreedTerms((checked) => !checked)}
        />
        <AgreementItem
          required
          label="개인정보처리 방침에 동의합니다"
          checked={agreedPrivacy}
          onToggle={() => setAgreedPrivacy((checked) => !checked)}
        />
      </div>

      <div className="flex w-full gap-3">
        <Button variant="secondary" onClick={() => router.back()}>
          이전
        </Button>
        <Button variant="primary">가입</Button>
      </div>
    </div>
  );
}
