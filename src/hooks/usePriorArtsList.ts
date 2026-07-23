"use client";

import { useEffect, useState } from "react";
import { getPriorArts, PRIOR_ARTS_ERROR_MESSAGES } from "@/lib/api/search";
import { ApiError } from "@/lib/api/error";
import type { PriorArt } from "@/types/search.type";

// 내 활동 기록 - 프로젝트 별 저장된 특허 목록
// 사건별 선행문헌 목록 조회 api (탐색 결과 페이지와 동일한 api를 이 페이지에서도 사용)
export function usePriorArtsList(caseId: string | undefined) {
  const [priorArts, setPriorArts] = useState<PriorArt[]>([]);
  const [isLoading, setIsLoading] = useState(() => Boolean(caseId));
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    if (!caseId) return;

    let cancelled = false;

    getPriorArts(Number(caseId))
      .then((result) => {
        if (cancelled) return;
        setPriorArts(result.priorArts);
        setError(null);
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
      })
      .finally(() => {
        if (cancelled) return;
        setIsLoading(false);
      });

    return () => {
      cancelled = true;
    };
  }, [caseId]);

  return { priorArts, isLoading, error };
}
