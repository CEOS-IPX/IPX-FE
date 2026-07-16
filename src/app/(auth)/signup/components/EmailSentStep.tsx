"use client";

import Link from "next/link";
import { useEffect, useState } from "react";
import { CodeInput } from "@/components/auth/CodeInput";
import { Button } from "@/components/ui/Button";
import { verifyEmailCode } from "@/lib/api/auth";
import { ApiError } from "@/lib/api/error";
import { EMAIL_VERIFICATION_PURPOSE } from "@/types/auth.type";

function formatTime(seconds: number) {
  const m = String(Math.floor(seconds / 60)).padStart(2, "0");
  const s = String(seconds % 60).padStart(2, "0");
  return `${m}분 ${s}초`;
}

type EmailSentStepProps = {
  email: string;
  expiresIn: number;
  onNext: (verificationToken: string) => void;
  onBack: () => void;
};

export const EmailSentStep = ({ email, expiresIn, onNext, onBack }: EmailSentStepProps) => {
  const [secondsLeft, setSecondsLeft] = useState(expiresIn);
  const [code, setCode] = useState("");
  const [isVerifying, setIsVerifying] = useState(false);
  const [verifyError, setVerifyError] = useState<string | null>(null);

  useEffect(() => {
    if (secondsLeft <= 0) return;
    const id = setInterval(() => setSecondsLeft((s) => s - 1), 1000);
    return () => clearInterval(id);
  }, [secondsLeft]);

  const expired = secondsLeft <= 0;

  const handleVerify = async () => {
    setVerifyError(null);
    setIsVerifying(true);
    try {
      const data = await verifyEmailCode({
        email,
        code,
        purpose: EMAIL_VERIFICATION_PURPOSE.SIGNUP,
      });
      onNext(data.verificationToken);
    } catch (err) {
      if (err instanceof ApiError) {
        if (err.status === 400) setVerifyError("인증 코드가 일치하지 않습니다.");
        else if (err.status === 404)
          setVerifyError("인증 요청 내역이 없습니다. 코드를 다시 받아주세요.");
        else if (err.status === 410)
          setVerifyError("인증 코드가 만료되었습니다. 코드를 다시 받아주세요.");
        else if (err.status === 429) setVerifyError("인증 시도 횟수를 초과했습니다.");
        else setVerifyError(err.message);
      } else {
        setVerifyError("네트워크 오류가 발생했습니다. 잠시 후 다시 시도해주세요.");
      }
    } finally {
      setIsVerifying(false);
    }
  };

  return (
    <div className="flex max-w-125 flex-1 flex-col items-start justify-center gap-10 self-stretch">
      <div className="flex w-full flex-col items-start gap-2">
        <h1 className="text-headline-emphasis-28 text-title-primary">인증 코드 입력</h1>
        <p className="flex items-baseline gap-2 text-body-19 text-body-disabled">
          <span>{email}으로 전송했어요</span>
          <span className="text-body-19 text-primary-default">
            {expired ? "(인증시간이 만료되었습니다)" : `(${formatTime(secondsLeft)})`}
          </span>
        </p>
      </div>
      <div className="flex w-full flex-col items-start gap-2">
        <CodeInput value={code} onChange={setCode} autoFocus error={expired || !!verifyError} />
        {expired && (
          <p className="text-label-13 text-error-default">
            인증 시간이 지났습니다. 인증코드 재전송 후 다시 인증해주세요
          </p>
        )}
        {!expired && verifyError && (
          <p className="text-label-13 text-error-default">{verifyError}</p>
        )}
      </div>
      <div className="flex w-full flex-col items-start gap-6">
        <div className="flex w-full gap-3">
          <Button variant="secondary" onClick={onBack}>
            이전
          </Button>
          <Button
            variant="primary"
            disabled={code.length < 6 || expired || isVerifying}
            onClick={handleVerify}
          >
            인증
          </Button>
        </div>
        <div className="flex h-6 w-full items-center justify-center gap-2">
          <span className="text-body-15 text-body-disabled">
            {expired ? "코드를 다시 전송할까요?" : "코드를 받지 못하셨나요?"}
          </span>
          <Link href="#" className="text-body-15 font-normal text-body-disabled underline">
            새 코드 받기
          </Link>
        </div>
      </div>
    </div>
  );
};
