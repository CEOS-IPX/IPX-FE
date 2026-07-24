"use client";

import { useEffect, useState } from "react";
import { getRecentCases } from "@/lib/api/case";
import { ApiError } from "@/lib/api/error";
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
  const [cases, setCases] = useState<RecentCase[]>([]);
  const [isLoading, setIsLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    let cancelled = false;

    getRecentCases(limit)
      .then((result) => {
        if (cancelled) return;

        setCases(result.cases);
        setError(null);
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
      })
      .finally(() => {
        if (cancelled) return;

        setIsLoading(false);
      });

    return () => {
      cancelled = true;
    };
  }, [limit]);

  return { cases, isLoading, error };
}
