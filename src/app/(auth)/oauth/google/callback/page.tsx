"use client";

import { Suspense, useEffect, useState } from "react";
import { useRouter, useSearchParams } from "next/navigation";
import Link from "next/link";
import { useAuthStore } from "@/store/authStore";
import { exchangeGoogleOAuthCode } from "@/lib/api/auth";
import { ApiError } from "@/lib/api/error";

// error.code 기준으로 분기 (message 기준 아님)
const ERROR_MESSAGES: Record<string, string> = {
  C001: "인증 코드가 유효하지 않습니다. 다시 로그인해주세요.",
  AU004: "비활성화된 계정입니다. 고객센터로 문의해주세요.",
  AU022: "이미 일반 회원으로 가입된 이메일입니다. 이메일로 로그인해주세요.",
  AU020: "Google 인증 처리에 실패했습니다. 다시 시도해주세요.",
  AU021: "Google 사용자 정보 조회에 실패했습니다. 다시 시도해주세요.",
  C002: "서버 오류가 발생했습니다. 잠시 후 다시 시도해주세요.",
};

function GoogleOAuthCallback() {
  const router = useRouter();
  const searchParams = useSearchParams();
  const setAuth = useAuthStore((s) => s.setAuth);
  const [apiErrorMessage, setApiErrorMessage] = useState<string | null>(null);
  const code = searchParams.get("code");

  useEffect(() => {
    if (!code) return;

    exchangeGoogleOAuthCode({ code })
      .then((data) => {
        if (data.status === "NEED_SIGNUP") {
          const params = new URLSearchParams({
            token: data.oauthSignupToken,
            email: data.email,
            ...(data.name ? { name: data.name } : {}),
          });
          router.replace(`/signup/google?${params.toString()}`);
          return;
        }

        setAuth(data.accessToken, data.user);
        router.replace("/search");
      })
      .catch((error) => {
        setApiErrorMessage(
          error instanceof ApiError
            ? (ERROR_MESSAGES[error.errorCode] ?? error.message)
            : "로그인 처리 중 문제가 발생했습니다."
        );
      });
  }, [code, router, setAuth]);

  // code가 없으면 기본 에러, 있으면 API 에러
  const displayError = !code ? ERROR_MESSAGES.C001 : apiErrorMessage;

  if (displayError) {
    return (
      <div className="flex h-full min-h-screen w-full flex-col items-center justify-center gap-3">
        <p className="text-body-15 text-error-default">{displayError}</p>
        <Link href="/login" className="text-label-15 text-primary-default underline">
          로그인으로 돌아가기
        </Link>
      </div>
    );
  }

  return <CallbackSpinner />;
}

function CallbackSpinner() {
  return (
    <div className="flex h-full min-h-screen w-full flex-col items-center justify-center gap-3">
      <div className="h-5 w-5 animate-spin rounded-full border-2 border-icon-primary-default border-t-transparent" />
      <p className="text-label-15 text-caption-label">로그인 처리 중입니다...</p>
    </div>
  );
}

export default function GoogleOAuthCallbackPage() {
  return (
    <Suspense fallback={<CallbackSpinner />}>
      <GoogleOAuthCallback />
    </Suspense>
  );
}
