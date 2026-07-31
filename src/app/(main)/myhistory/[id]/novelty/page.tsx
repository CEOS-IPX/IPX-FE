"use client";

import { use } from "react";
import { Button } from "@/components/ui/Button";
import { BackButton } from "@/components/ui/BackButton";
import Header from "@/components/myhistory/novelty/Header";
import Similarity from "@/components/myhistory/novelty/Similarity";
import NoveltyTable from "@/components/myhistory/novelty/NoveltyTable";
import { useNoveltyAnalysis } from "@/hooks/useNoveltyAnalysis";
import type { NoveltyOverallSimilarity } from "@/types/novelty.type";

const SIMILARITY_LABELS: Record<NoveltyOverallSimilarity, string> = {
  VERY_HIGH: "매우 높음",
  HIGH: "높음",
  MEDIUM: "보통",
  LOW: "낮음",
  VERY_LOW: "매우 낮음",
};

export default function NoveltyPage({ params }: { params: Promise<{ id: string }> }) {
  const { id } = use(params);
  const { analysis, errorMessage, isLoading, saveComparison, reload } = useNoveltyAnalysis(id);

  if (isLoading) {
    return (
      <div className="flex min-h-80 items-center justify-center bg-bg-surface">
        <p className="text-body-15 text-caption-label">신규성 분석 결과를 불러오고 있습니다...</p>
      </div>
    );
  }

  if (errorMessage || !analysis) {
    return (
      <div className="flex flex-col gap-6 bg-bg-surface">
        <BackButton />
        <div
          role="alert"
          className="flex min-h-64 flex-col items-center justify-center gap-4 rounded-lg bg-bg-neutral-hover"
        >
          <p className="text-body-17 text-body-secondary">
            {errorMessage ?? "신규성 분석 결과를 불러오지 못했습니다."}
          </p>
          <Button variant="secondary" size="sm" onClick={reload}>
            다시 조회
          </Button>
        </div>
      </div>
    );
  }

  return (
    <div className="flex flex-col gap-6 bg-bg-surface">
      <BackButton />

      <Header
        title={analysis.primaryArt.title}
        status={analysis.primaryArt.legalStatus}
        applicationNumber={analysis.primaryArt.applicationNumber}
        organization={analysis.primaryArt.applicantName}
      />

      <Similarity
        similarity={SIMILARITY_LABELS[analysis.overallSimilarity]}
        reason={analysis.conclusionText}
      />

      <NoveltyTable comparisons={analysis.comparisons} onSave={saveComparison} />
    </div>
  );
}
