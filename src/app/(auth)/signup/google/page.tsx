"use client";

import { Suspense, useState } from "react";
import { useRouter, useSearchParams } from "next/navigation";
import Link from "next/link";
import { AgreementItem } from "@/components/auth/AgreementItem";
import { Button } from "@/components/ui/Button";
import { TextField } from "@/components/ui/TextField";
import { signupWithGoogle } from "@/lib/api/auth";
import { ApiError } from "@/lib/api/error";
import { useAuthStore } from "@/store/authStore";
import { TERMS_TYPE } from "@/types/auth.type";

// error.code 기준으로 분기 (message 기준 아님)
const ERROR_MESSAGES: Record<string, string> = {
  C001: "입력값을 다시 확인해주세요.",
  AU024: "필수 약관에 모두 동의해주세요.",
  AU001: "이미 가입된 이메일입니다.",
  AU023: "회원가입 세션이 만료되었습니다. 다시 로그인해주세요.",
  C002: "서버 오류가 발생했습니다. 잠시 후 다시 시도해주세요.",
};

function GoogleSignupForm() {
  const router = useRouter();
  const searchParams = useSearchParams();
  const setAuth = useAuthStore((s) => s.setAuth);

  const token = searchParams.get("token");
  const name = searchParams.get("name") ?? "";

  const [company, setCompany] = useState("");
  const [agreedTerms, setAgreedTerms] = useState(false);
  const [agreedPrivacy, setAgreedPrivacy] = useState(false);
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [submitError, setSubmitError] = useState<string | null>(null);

  const canSubmit = agreedTerms && agreedPrivacy && !isSubmitting;

  const handleSubmit = async () => {
    if (!token) {
      setSubmitError("회원가입 세션이 유효하지 않습니다. 다시 로그인해주세요.");
      return;
    }

    setIsSubmitting(true);
    setSubmitError(null);

    try {
      const data = await signupWithGoogle({
        oauthSignupToken: token,
        company: company || undefined,
        termsAgreements: [
          { type: TERMS_TYPE.SERVICE_TERMS, agreed: agreedTerms },
          { type: TERMS_TYPE.PRIVACY_POLICY, agreed: agreedPrivacy },
          { type: TERMS_TYPE.MARKETING, agreed: false },
        ],
      });

      setAuth(data.accessToken, data.user);
      router.replace("/search");
    } catch (err) {
      setSubmitError(
        err instanceof ApiError
          ? (ERROR_MESSAGES[err.errorCode] ?? err.message)
          : "회원가입 중 문제가 발생했습니다."
      );
    } finally {
      setIsSubmitting(false);
    }
  };

  return (
    <div className="flex max-w-125 flex-1 flex-col items-start justify-center gap-10 self-stretch">
      <h1 className="w-full text-headline-emphasis-28 text-title-primary">회원정보</h1>

      <div className="flex w-full flex-col items-start gap-4">
        <TextField
          label="이름"
          value={name}
          disabled
          className="cursor-default bg-bg-neutral-hover disabled:opacity-100"
        />
        <TextField
          label="회사명 (선택)"
          placeholder="회사명을 입력해주세요 (선택)"
          value={company}
          onChange={(e) => setCompany(e.target.value)}
        />
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

      {submitError && (
        <p className="text-body-15 text-error-default">
          {submitError}
          {submitError === ERROR_MESSAGES.AU023 && (
            <>
              {" "}
              <Link href="/login" className="underline">
                로그인으로 이동
              </Link>
            </>
          )}
        </p>
      )}

      <div className="flex w-full gap-3">
        <Button variant="secondary" onClick={() => router.back()}>
          이전
        </Button>
        <Button variant="primary" onClick={handleSubmit} disabled={!canSubmit}>
          가입
        </Button>
      </div>
    </div>
  );
}

export default function GoogleSignupPage() {
  return (
    <Suspense fallback={null}>
      <GoogleSignupForm />
    </Suspense>
  );
}
