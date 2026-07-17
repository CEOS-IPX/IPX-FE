"use client";

import { useEffect, useState } from "react";
import { CodeInput } from "@/components/auth/CodeInput";
import { Button } from "@/components/ui/Button";
import { sendEmailCode, verifyEmailCode } from "@/lib/api/auth";
import { ApiError } from "@/lib/api/error";
import { EMAIL_VERIFICATION_PURPOSE } from "@/types/auth.type";

function formatTime(seconds: number) {
  const m = String(Math.floor(seconds / 60)).padStart(2, "0");
  const s = String(seconds % 60).padStart(2, "0");
  return `${m}분 ${s}초`;
}

// error.code 기준으로 분기 (message 기준 아님)
const ERROR_MESSAGES: Record<string, string> = {
  C001: "잘못된 입력값입니다.",
  AU010: "잘못된 이메일 인증 목적입니다.",
  AU011: "인증 코드가 일치하지 않습니다.",
  AU012: "인증 코드가 만료되었거나 존재하지 않습니다.",
  AU004: "존재하지 않는 사용자입니다.",
  AU013: "소셜 로그인 계정은 비밀번호를 재설정할 수 없습니다.",
  AU014: "이미 사용된 인증 코드입니다.",
  C002: "서버 내부 오류가 발생했습니다.",
};

// 재전송(email/send)은 별도 error.code 체계를 쓴다 (EmailInputStep과 동일)
const RESEND_ERROR_MESSAGES: Record<string, string> = {
  C001: "이메일 형식을 다시 확인해주세요.",
  A001: "가입되지 않은 이메일입니다.",
  A016: "소셜 로그인 계정은 비밀번호 재설정이 불가능합니다.",
  A011: "잠시 후 다시 시도해주세요.",
  A012: "이메일 발송에 실패했습니다. 잠시 후 다시 시도해주세요.",
  C003: "서버 오류가 발생했습니다. 잠시 후 다시 시도해주세요.",
};

interface Props {
  email: string;
  expiresIn: number;
  resendAvailableIn: number;
  onNext: (verificationToken: string) => void;
  onPrev: () => void;
}

export function VerifyStep({ email, expiresIn, resendAvailableIn, onNext, onPrev }: Props) {
  const [secondsLeft, setSecondsLeft] = useState(expiresIn);
  const [resendCooldown, setResendCooldown] = useState(resendAvailableIn);
  const [code, setCode] = useState("");
  const [isVerifying, setIsVerifying] = useState(false);
  const [verifyError, setVerifyError] = useState<string | null>(null);
  const [isResending, setIsResending] = useState(false);
  const [resendError, setResendError] = useState<string | null>(null);

  useEffect(() => {
    if (secondsLeft <= 0) return;
    const id = setInterval(() => setSecondsLeft((s) => s - 1), 1000);
    return () => clearInterval(id);
  }, [secondsLeft]);

  useEffect(() => {
    if (resendCooldown <= 0) return;
    const id = setInterval(() => setResendCooldown((s) => s - 1), 1000);
    return () => clearInterval(id);
  }, [resendCooldown]);

  const expired = secondsLeft <= 0;

  const handleVerify = async () => {
    setVerifyError(null);
    setIsVerifying(true);
    try {
      const data = await verifyEmailCode({
        email,
        code,
        purpose: EMAIL_VERIFICATION_PURPOSE.RESET_PASSWORD,
      });
      onNext(data.verificationToken);
    } catch (err) {
      if (err instanceof ApiError) {
        setVerifyError(ERROR_MESSAGES[err.errorCode] ?? err.message);
      } else {
        setVerifyError("네트워크 오류가 발생했습니다. 잠시 후 다시 시도해주세요.");
      }
    } finally {
      setIsVerifying(false);
    }
  };

  const handleResend = async () => {
    setResendError(null);
    setIsResending(true);
    try {
      const result = await sendEmailCode({
        email,
        purpose: EMAIL_VERIFICATION_PURPOSE.RESET_PASSWORD,
      });
      setCode("");
      setVerifyError(null);
      setSecondsLeft(result.expiresIn);
      setResendCooldown(result.resendAvailableIn);
    } catch (err) {
      setResendError(
        err instanceof ApiError
          ? (RESEND_ERROR_MESSAGES[err.errorCode] ?? err.message)
          : "네트워크 오류가 발생했습니다. 잠시 후 다시 시도해주세요."
      );
    } finally {
      setIsResending(false);
    }
  };

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
          <Button variant="secondary" onClick={onPrev}>
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
        <div className="flex w-full flex-col items-center gap-1">
          <div className="flex h-6 w-full items-center justify-center gap-2">
            <span className="text-label-15 text-body-disabled">코드를 다시 전송할까요?</span>
            <button
              type="button"
              onClick={handleResend}
              disabled={resendCooldown > 0 || isResending}
              className="text-label-15 font-normal text-body-disabled underline disabled:cursor-not-allowed disabled:no-underline disabled:opacity-50"
            >
              새 코드 받기
            </button>
          </div>
          {resendError && <p className="text-label-13 text-error-default">{resendError}</p>}
        </div>
      </div>
    </div>
  );
}
