"use client";

import { useEffect, useState } from "react";
import { getCaseDetail } from "@/lib/api/case";
import { ApiError } from "@/lib/api/error";
import type { ProjectStep } from "@/components/myhistory/SelectableItem";
import type { CaseDetail } from "@/types/case.type";

// 이 부분 더 확인하고 수정할 필요 있음!!!!
export function deriveCurrentStep(detail: CaseDetail): ProjectStep {
  if (detail.reportCompletedAt) return "분석 리포트";
  if (detail.noveltyCompletedAt || detail.inventiveCompletedAt) return "기술 분석";
  return "구성요소 분해";
}

// 에러코드별 메시지 정리해놓음
const CASE_DETAIL_ERROR_MESSAGES: Record<string, string> = {
  AU004: "인증이 필요합니다.",
  SC001: "인증이 필요합니다.",
  CA002: "해당 사건에 접근할 권한이 없습니다.",
  CA001: "사건을 찾을 수 없습니다.",
  C002: "서버 내부 오류가 발생했습니다.",
};

// 내 활동 기록 - 사건 상세 페이지 (사건 개요 / 상태 표시 영역)
// 사건 상세 조회 api
export function useCaseDetail(id: string | undefined) {
  const [detail, setDetail] = useState<CaseDetail | null>(null);
  const [isLoading, setIsLoading] = useState(() => Boolean(id));
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    if (!id) return;

    let cancelled = false;

    getCaseDetail(Number(id))
      .then((result) => {
        if (cancelled) return;
        setDetail(result);
        setError(null);
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
      })
      .finally(() => {
        if (cancelled) return;
        setIsLoading(false);
      });

    return () => {
      cancelled = true;
    };
  }, [id]);

  return { detail, isLoading, error };
}
