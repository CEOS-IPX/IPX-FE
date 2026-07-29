"use client";

import { useEffect, useState } from "react";
import { getReport } from "@/lib/api/analysis";
import { ApiError } from "@/lib/api/error";
import { useAuthStore } from "@/store/authStore";
import type { ReportDetailResponse } from "@/types/report.type";

const REPORT_ERROR_MESSAGES: Record<string, string> = {
  SC001: "로그인이 필요합니다.",
  CA002: "해당 사건에 접근할 권한이 없습니다.",
  CA001: "사건을 찾을 수 없습니다.",
  RP002: "분석 리포트를 찾을 수 없습니다.",
  C002: "서버 내부 오류가 발생했습니다. 잠시 후 다시 시도해주세요.",
};

// 분석 리포트 페이지: 리포트 조회
export function useReport(id: string) {
  const isAuthInitialized = useAuthStore((state) => state.isInitialized);
  const accessToken = useAuthStore((state) => state.accessToken);

  const [result, setResult] = useState<{ caseId: string; report: ReportDetailResponse } | null>(
    null
  );
  const [requestError, setRequestError] = useState<{ caseId: string; message: string } | null>(
    null
  );
  const [reloadCount, setReloadCount] = useState(0);

  useEffect(() => {
    if (!isAuthInitialized || !accessToken) return;

    let canceled = false;

    getReport(id)
      .then((data) => {
        if (canceled) return;
        setRequestError(null);
        setResult({ caseId: id, report: data });
      })
      .catch((error) => {
        if (canceled) return;
        setResult(null);
        setRequestError({
          caseId: id,
          message:
            error instanceof ApiError
              ? (REPORT_ERROR_MESSAGES[error.errorCode] ?? error.message)
              : "분석 리포트를 불러오는 중 네트워크 오류가 발생했습니다.",
        });
      });

    return () => {
      canceled = true;
    };
  }, [accessToken, id, isAuthInitialized, reloadCount]);

  const report = result?.caseId === id ? result.report : null;
  const errorMessage =
    !isAuthInitialized || accessToken
      ? requestError?.caseId === id
        ? requestError.message
        : null
      : REPORT_ERROR_MESSAGES.SC001;
  const isLoading = !isAuthInitialized || Boolean(accessToken && !report && !errorMessage);

  const reload = () => {
    setResult(null);
    setRequestError(null);
    setReloadCount((count) => count + 1);
  };

  return {
    isAuthenticated: Boolean(accessToken),
    report,
    errorMessage,
    isLoading,
    reload,
  };
}
