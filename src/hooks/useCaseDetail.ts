"use client";

import { useEffect, useState } from "react";
import { getCaseDetail } from "@/lib/api/case";
import { ApiError } from "@/lib/api/error";
import { parseCaseId } from "@/lib/parseCaseId";
import { useAuthStore } from "@/store/authStore";
import type { ProjectStep } from "@/components/myhistory/SelectableItem";
import type { CaseDetail } from "@/types/case.type";

// 신규성/진보성 분석은 순서 상관없이 독립적으로 실행 가능하므로, status(단일 값) 대신
// 각 단계별 완료 시각 필드로 개별 판단 -> "기술 분석"은 신규성+진보성 둘 다 끝났을 때만 완료로 표시
export function deriveCompletedSteps(detail: CaseDetail): Record<ProjectStep, boolean> {
  return {
    "구성요소 분해": detail.status !== "NOT_STARTED",
    "기술 분석": Boolean(detail.noveltyCompletedAt) && Boolean(detail.inventiveCompletedAt),
    "분석 리포트": detail.status === "REPORT_COMPLETED",
  };
}

// 에러코드별 메시지 정리해놓음
const CASE_DETAIL_ERROR_MESSAGES: Record<string, string> = {
  AU004: "인증이 필요합니다.",
  SC001: "인증이 필요합니다.",
  CA002: "해당 사건에 접근할 권한이 없습니다.",
  CA001: "사건을 찾을 수 없습니다.",
  C002: "서버 내부 오류가 발생했습니다.",
};

// 내 활동 기록
// 사건 상세 조회 api
export function useCaseDetail(id: string | undefined) {
  const caseId = parseCaseId(id);
  const isAuthInitialized = useAuthStore((state) => state.isInitialized);
  const accessToken = useAuthStore((state) => state.accessToken);
  const canRequest = isAuthInitialized && Boolean(accessToken);

  const [detail, setDetail] = useState<CaseDetail | null>(null);
  const [error, setError] = useState<string | null>(null);

  // 지금 detail/error가 어느 caseId에 대한 결과인지 -> caseId가 바뀌면 아직 그 caseId로 fetch가 안 끝났다는 뜻이라
  // isLoading을 effect 안에서 동기적으로 setState하지 않고 렌더링 시점에 비교로 도출(react-hooks/set-state-in-effect 회피)
  const [loadedId, setLoadedId] = useState<number | null>(null);
  const isLoading = !isAuthInitialized || (canRequest && caseId !== null && caseId !== loadedId);

  useEffect(() => {
    if (caseId === null || !canRequest) return;

    let cancelled = false;

    getCaseDetail(caseId)
      .then((result) => {
        if (cancelled) return;
        setDetail(result);
        setError(null);
        setLoadedId(caseId);
      })
      .catch((err) => {
        if (cancelled) return;
        if (err instanceof ApiError) {
          setError(
            CASE_DETAIL_ERROR_MESSAGES[err.errorCode] ||
              err.message ||
              "사건 정보를 불러오는 중 오류가 발생했습니다."
          );
        } else {
          setError("사건 정보를 불러오는 중 오류가 발생했습니다.");
        }
        setLoadedId(caseId);
      });

    return () => {
      cancelled = true;
    };
  }, [canRequest, caseId]);

  if (id && caseId === null) {
    return { detail: null, isLoading: false, error: "잘못된 사건 ID입니다." };
  }

  if (isAuthInitialized && !accessToken) {
    return { detail: null, isLoading: false, error: "인증이 필요합니다." };
  }

  return { detail: isLoading ? null : detail, isLoading, error: isLoading ? null : error };
}
