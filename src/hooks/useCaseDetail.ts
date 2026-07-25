"use client";

import { useEffect, useState } from "react";
import { getCaseDetail } from "@/lib/api/case";
import { ApiError } from "@/lib/api/error";
import type { ProjectStep } from "@/components/myhistory/SelectableItem";
import type { CaseDetail } from "@/types/case.type";

// status는 지금까지 완료된 가장 마지막 단계를 나타냄(탐색, 신규성, 진보성, 리포트 순서로!)
// NOT_STARTED -> 구성요소 분해, SEARCH/NOVELTY/INVENTIVE_COMPLETED -> 기술 분석, REPORT_COMPLETED -> 분석 리포트
export function deriveCurrentStep(detail: CaseDetail): ProjectStep {
  if (detail.status === "REPORT_COMPLETED") return "분석 리포트";
  if (detail.status === "NOT_STARTED") return "구성요소 분해";
  return "기술 분석";
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
  const [detail, setDetail] = useState<CaseDetail | null>(null);
  const [error, setError] = useState<string | null>(null);

  // 지금 detail/error가 어느 id에 대한 결과인지 -> id가 바뀌면 아직 그 id로 fetch가 안 끝났다는 뜻이라
  // isLoading을 effect 안에서 동기적으로 setState하지 않고 렌더링 시점에 비교로 도출(react-hooks/set-state-in-effect 회피)
  const [loadedId, setLoadedId] = useState<string | undefined>(undefined);
  const isLoading = Boolean(id) && id !== loadedId;

  useEffect(() => {
    if (!id) return;

    let cancelled = false;

    getCaseDetail(Number(id))
      .then((result) => {
        if (cancelled) return;
        setDetail(result);
        setError(null);
        setLoadedId(id);
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
        setLoadedId(id);
      });

    return () => {
      cancelled = true;
    };
  }, [id]);

  return { detail: isLoading ? null : detail, isLoading, error: isLoading ? null : error };
}
