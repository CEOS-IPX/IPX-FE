"use client";

import { useEffect, useState } from "react";
import { getPriorArts, PRIOR_ARTS_ERROR_MESSAGES } from "@/lib/api/search";
import { ApiError } from "@/lib/api/error";
import { parseCaseId } from "@/lib/parseCaseId";
import type { PriorArt } from "@/types/search.type";

// 내 활동 기록 - 프로젝트 별 저장된 특허 목록
// 사건별 선행문헌 목록 조회 api (탐색 결과 페이지와 동일한 api를 이 페이지에서도 사용)
export function usePriorArtsList(caseIdParam: string | undefined) {
  const caseId = parseCaseId(caseIdParam);

  const [priorArts, setPriorArts] = useState<PriorArt[]>([]);
  const [error, setError] = useState<string | null>(null);
  // caseId가 바뀌면 아직 그 caseId로 fetch가 안 끝났다는 뜻 -> 렌더링 시점 비교로 isLoading 도출
  const [loadedCaseId, setLoadedCaseId] = useState<number | null>(null);
  const isLoading = caseId !== null && caseId !== loadedCaseId;

  useEffect(() => {
    if (caseId === null) return;

    let cancelled = false;

    getPriorArts(caseId)
      .then((result) => {
        if (cancelled) return;
        setPriorArts(result.priorArts);
        setError(null);
        setLoadedCaseId(caseId);
      })
      .catch((err) => {
        if (cancelled) return;
        if (err instanceof ApiError) {
          setError(
            PRIOR_ARTS_ERROR_MESSAGES[err.errorCode] ||
              err.message ||
              "저장된 특허 목록을 불러오는 중 오류가 발생했습니다."
          );
        } else {
          setError("저장된 특허 목록을 불러오는 중 오류가 발생했습니다.");
        }
        setLoadedCaseId(caseId);
      });

    return () => {
      cancelled = true;
    };
  }, [caseId]);

  if (caseIdParam && caseId === null) {
    return { priorArts: [], isLoading: false, error: "잘못된 사건 ID입니다." };
  }

  return { priorArts: isLoading ? [] : priorArts, isLoading, error: isLoading ? null : error };
}
