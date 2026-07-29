"use client";

import { useEffect, useState } from "react";
import { getNoveltyAnalysis, updateNoveltyComparison } from "@/lib/api/analysis";
import { ApiError } from "@/lib/api/error";
import { useAuthStore } from "@/store/authStore";
import type { NoveltyAnalysisResponse, UpdateNoveltyComparisonRequest } from "@/types/novelty.type";

const NOVELTY_ANALYSIS_ERROR_MESSAGES: Record<string, string> = {
  C001: "수정할 내용을 확인해주세요.",
  SC001: "로그인이 필요합니다.",
  CA002: "해당 사건에 접근할 권한이 없습니다.",
  CA001: "사건을 찾을 수 없습니다.",
  N001: "신규성 분석 결과가 존재하지 않습니다.",
  N002: "수정할 신규성 비교 결과를 찾을 수 없습니다.",
  C002: "서버 내부 오류가 발생했습니다. 잠시 후 다시 시도해주세요.",
};

// 신규성 분석 페이지: 분석 결과 조회 + 비교 결과 수정 저장
export function useNoveltyAnalysis(id: string) {
  const isAuthInitialized = useAuthStore((state) => state.isInitialized);
  const accessToken = useAuthStore((state) => state.accessToken);

  const [result, setResult] = useState<{
    caseId: string;
    analysis: NoveltyAnalysisResponse;
  } | null>(null);
  const [requestError, setRequestError] = useState<{
    caseId: string;
    message: string;
  } | null>(null);
  const [reloadCount, setReloadCount] = useState(0);

  useEffect(() => {
    if (!isAuthInitialized || !accessToken) return;

    let canceled = false;

    getNoveltyAnalysis(id)
      .then((data) => {
        if (canceled) return;
        setRequestError(null);
        setResult({ caseId: id, analysis: data });
      })
      .catch((error) => {
        if (canceled) return;

        setResult(null);
        setRequestError({
          caseId: id,
          message:
            error instanceof ApiError
              ? (NOVELTY_ANALYSIS_ERROR_MESSAGES[error.errorCode] ?? error.message)
              : "신규성 분석 결과를 불러오는 중 네트워크 오류가 발생했습니다.",
        });
      });

    return () => {
      canceled = true;
    };
  }, [accessToken, id, isAuthInitialized, reloadCount]);

  const analysis = result?.caseId === id ? result.analysis : null;
  const errorMessage =
    !isAuthInitialized || accessToken
      ? requestError?.caseId === id
        ? requestError.message
        : null
      : NOVELTY_ANALYSIS_ERROR_MESSAGES.SC001;
  const isLoading = !isAuthInitialized || Boolean(accessToken && !analysis && !errorMessage);

  const saveComparison = async (comparisonId: number, body: UpdateNoveltyComparisonRequest) => {
    try {
      const updated = await updateNoveltyComparison(comparisonId, body);

      setResult((previous) => {
        if (!previous || previous.caseId !== id) return previous;

        return {
          ...previous,
          analysis: {
            ...previous.analysis,
            comparisons: previous.analysis.comparisons.map((comparison) =>
              comparison.comparisonId === updated.comparisonId
                ? {
                    ...comparison,
                    comparisonResult: updated.comparisonResult,
                    citation: updated.citation !== undefined ? updated.citation : body.citation,
                  }
                : comparison
            ),
          },
        };
      });
    } catch (error) {
      const message =
        error instanceof ApiError
          ? (NOVELTY_ANALYSIS_ERROR_MESSAGES[error.errorCode] ?? error.message)
          : "신규성 비교 결과 수정 중 네트워크 오류가 발생했습니다.";
      throw new Error(message);
    }
  };

  const reload = () => {
    setResult(null);
    setRequestError(null);
    setReloadCount((count) => count + 1);
  };

  return {
    analysis,
    errorMessage,
    isLoading,
    saveComparison,
    reload,
  };
}
