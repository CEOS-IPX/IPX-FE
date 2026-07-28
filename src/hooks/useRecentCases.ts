"use client";

import { useEffect, useState } from "react";
import { getRecentCases } from "@/lib/api/case";
import { ApiError } from "@/lib/api/error";
import { useRecentCasesStore } from "@/store/recentCasesStore";
import type { RecentCase } from "@/types/case.type";

// 에러코드별 메시지
const RECENT_CASES_ERROR_MESSAGES: Record<string, string> = {
  C001: "잘못된 입력값입니다.",
  AU004: "인증이 필요합니다.",
  SC001: "인증이 필요합니다.",
  C002: "서버 내부 오류가 발생했습니다.",
};

// 사이드바 "최근 탐색" 영역 - 최근 사건 목록 조회
export function useRecentCases(limit = 5) {
  const version = useRecentCasesStore((s) => s.version);
  const [cases, setCases] = useState<RecentCase[]>([]);
  const [error, setError] = useState<string | null>(null);
  // limit이 바뀌면 아직 그 limit으로 fetch가 안 끝났다는 뜻 -> 렌더링 시점 비교로 isLoading 도출
  const [loadedLimit, setLoadedLimit] = useState<number | undefined>(undefined);
  const isLoading = limit !== loadedLimit;

  useEffect(() => {
    let cancelled = false;

    getRecentCases(limit)
      .then((result) => {
        if (cancelled) return;

        setCases(result.cases);
        setError(null);
        setLoadedLimit(limit);
      })
      .catch((err) => {
        if (cancelled) return;

        setCases([]);
        if (err instanceof ApiError) {
          setError(
            RECENT_CASES_ERROR_MESSAGES[err.errorCode] ||
              err.message ||
              "최근 사건 목록을 불러오는 중 오류가 발생했습니다."
          );
        } else {
          setError("최근 사건 목록을 불러오는 중 오류가 발생했습니다.");
        }
        setLoadedLimit(limit);
      });

    return () => {
      cancelled = true;
    };
  }, [limit, version]);

  return { cases, isLoading, error };
}
