"use client";

import Link from "next/link";
import { useEffect, useState } from "react";
import { CodeInput } from "@/components/auth/CodeInput";
import { Button } from "@/components/ui/Button";

const INITIAL_SECONDS = 5 * 60;

function formatTime(seconds: number) {
  const m = String(Math.floor(seconds / 60)).padStart(2, "0");
  const s = String(seconds % 60).padStart(2, "0");
  return `${m}분 ${s}초`;
}

interface Props {
  email: string;
  onNext: () => void;
  onPrev: () => void;
}

export function VerifyStep({ email, onNext, onPrev }: Props) {
  const [secondsLeft, setSecondsLeft] = useState(INITIAL_SECONDS);
  const [code, setCode] = useState("");

  useEffect(() => {
    if (secondsLeft <= 0) return;
    const id = setInterval(() => setSecondsLeft((s) => s - 1), 1000);
    return () => clearInterval(id);
  }, [secondsLeft]);

  const expired = secondsLeft <= 0;

  return (
    <div className="flex max-w-125 flex-1 flex-col items-start justify-center gap-10 self-stretch">
      <div className="flex w-full flex-col items-start gap-2">
        <h1 className="text-headline-emphasis-28 text-title-secondary">인증 코드 입력</h1>
        <p className="flex items-baseline gap-2 text-body-19 text-body-disabled">
          <span>{email}으로 전송했어요</span>
          <span className="text-body-19 text-primary-default">
            {expired ? "(인증시간이 만료되었습니다)" : `(${formatTime(secondsLeft)})`}
          </span>
        </p>
      </div>
      <div className="flex w-full flex-col items-start gap-2">
        <CodeInput value={code} onChange={setCode} autoFocus error={expired} />
        {expired && (
          <p className="text-label-13 text-error-default">
            인증 시간이 지났습니다. 인증코드 재전송 후 다시 인증해주세요
          </p>
        )}
      </div>
      <div className="flex w-full flex-col items-start gap-6">
        <div className="flex w-full gap-3">
          <Button variant="secondary" onClick={onPrev}>
            이전
          </Button>
          <Button variant="primary" disabled={code.length < 6 || expired} onClick={onNext}>
            인증
          </Button>
        </div>
        <div className="flex h-6 w-full items-center justify-center gap-2">
          <span className="text-label-15 text-body-disabled">코드를 다시 전송할까요?</span>
          <Link href="#" className="text-label-15 font-normal text-body-disabled underline">
            새 코드 받기
          </Link>
        </div>
      </div>
    </div>
  );
}
