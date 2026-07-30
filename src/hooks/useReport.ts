"use client";

import { useEffect, useState } from "react";
import { createReport, getReport } from "@/lib/api/analysis";
import { ApiError } from "@/lib/api/error";
import { useAuthStore } from "@/store/authStore";
import type { ReportDetailResponse } from "@/types/report.type";

// 분석 리포트 조회 api 에러코드별 메시지
const REPORT_ERROR_MESSAGES: Record<string, string> = {
  SC001: "로그인이 필요합니다.",
  CA002: "해당 사건에 접근할 권한이 없습니다.",
  CA001: "사건을 찾을 수 없습니다.",
  RP002: "분석 리포트를 찾을 수 없습니다.",
  N001: "신규성 분석 결과가 존재하지 않습니다.",
  I003: "진보성 분석 결과가 존재하지 않습니다.",
  C002: "서버 내부 오류가 발생했습니다. 잠시 후 다시 시도해주세요.",
};

// 분석 리포트 생성 api 에러코드별 메시지
const CREATE_REPORT_ERROR_MESSAGES: Record<string, string> = {
  C001: "잘못된 요청입니다.",
  SC001: "로그인이 필요합니다.",
  CA002: "해당 사건에 접근할 권한이 없습니다.",
  CA001: "사건을 찾을 수 없습니다.",
  N001: "신규성 분석 결과가 존재하지 않습니다.",
  I003: "진보성 분석 결과가 존재하지 않습니다.",
  C002: "서버 내부 오류가 발생했습니다. 잠시 후 다시 시도해주세요.",
};

// 분석 리포트 페이지: 리포트 조회, 아직 생성되지 않았으면(RP002) 자동 생성 후 다시 조회
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

    const load = async () => {
      try {
        const data = await getReport(id);
        if (canceled) return;
        setRequestError(null);
        setResult({ caseId: id, report: data });
      } catch (error) {
        if (canceled) return;

        const isNotCreatedYet = error instanceof ApiError && error.errorCode === "RP002";
        if (!isNotCreatedYet) {
          setResult(null);
          setRequestError({
            caseId: id,
            message:
              error instanceof ApiError
                ? (REPORT_ERROR_MESSAGES[error.errorCode] ?? error.message)
                : "분석 리포트를 불러오는 중 네트워크 오류가 발생했습니다.",
          });
          return;
        }

        // 리포트가 아직 없으면(RP002) 자동 생성 후 다시 조회한다.
        try {
          await createReport(id);
          if (canceled) return;
          const data = await getReport(id);
          if (canceled) return;
          setRequestError(null);
          setResult({ caseId: id, report: data });
        } catch (createError) {
          if (canceled) return;
          // 레이스 컨디션으로 그 사이 이미 생성됐다면(RP001) 다시 조회만 시도한다.
          if (createError instanceof ApiError && createError.errorCode === "RP001") {
            try {
              const data = await getReport(id);
              if (canceled) return;
              setRequestError(null);
              setResult({ caseId: id, report: data });
              return;
            } catch {
              // 아래 공통 에러 처리로 진행
            }
          }
          setResult(null);
          setRequestError({
            caseId: id,
            message:
              createError instanceof ApiError
                ? (CREATE_REPORT_ERROR_MESSAGES[createError.errorCode] ?? createError.message)
                : "분석 리포트를 생성하는 중 네트워크 오류가 발생했습니다.",
          });
        }
      }
    };

    load();

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
