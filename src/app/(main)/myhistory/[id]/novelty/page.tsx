"use client";

import { use, useEffect, useState } from "react";
import { Button } from "@/components/ui/Button";
import { BackButton } from "@/components/ui/BackButton";
import Header from "@/components/myhistory/novelty/Header";
import Similarity from "@/components/myhistory/novelty/Similarity";
import NoveltyTable from "@/components/myhistory/novelty/NoveltyTable";
import { getNoveltyAnalysis } from "@/lib/api/analysis";
import { ApiError } from "@/lib/api/error";
import { useAuthStore } from "@/store/authStore";
import type { NoveltyAnalysisResponse, NoveltyOverallSimilarity } from "@/types/novelty.type";

const SIMILARITY_LABELS: Record<NoveltyOverallSimilarity, string> = {
  VERY_HIGH: "매우 높음",
  HIGH: "높음",
  MEDIUM: "보통",
  LOW: "낮음",
  VERY_LOW: "매우 낮음",
};

const NOVELTY_ANALYSIS_ERROR_MESSAGES: Record<string, string> = {
  SC001: "로그인이 필요합니다.",
  CA002: "해당 사건에 접근할 권한이 없습니다.",
  CA001: "사건을 찾을 수 없습니다.",
  N001: "신규성 분석 결과가 존재하지 않습니다.",
  C002: "서버 내부 오류가 발생했습니다. 잠시 후 다시 시도해주세요.",
};

export default function NoveltyPage({ params }: { params: Promise<{ id: string }> }) {
  const { id } = use(params);
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

  if (!isAuthInitialized || (accessToken && !analysis && !errorMessage)) {
    return (
      <div className="flex min-h-80 items-center justify-center">
        <p className="text-body-15 text-caption-label">신규성 분석 결과를 불러오고 있습니다...</p>
      </div>
    );
  }

  if (errorMessage || !analysis) {
    return (
      <div className="flex flex-col gap-6">
        <BackButton />
        <div
          role="alert"
          className="flex min-h-64 flex-col items-center justify-center gap-4 rounded-lg bg-bg-neutral-hover"
        >
          <p className="text-body-17 text-body-secondary">
            {errorMessage ?? "신규성 분석 결과를 불러오지 못했습니다."}
          </p>
          <Button
            variant="secondary"
            size="sm"
            onClick={() => {
              setResult(null);
              setRequestError(null);
              setReloadCount((count) => count + 1);
            }}
          >
            다시 조회
          </Button>
        </div>
      </div>
    );
  }

  return (
    <div className="flex flex-col gap-6">
      <BackButton />

      <Header
        title={analysis.primaryArt.title}
        status={analysis.primaryArt.legalStatus}
        patentNumber={analysis.primaryArt.applicationNumber}
        organization={analysis.primaryArt.applicantName}
      />

      <Similarity
        similarity={SIMILARITY_LABELS[analysis.overallSimilarity]}
        reason={analysis.conclusionText}
      />

      <NoveltyTable comparisons={analysis.comparisons} />
    </div>
  );
}
