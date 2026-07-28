"use client";

import { useState } from "react";
import { useRouter } from "next/navigation";
import BackIcon from "@/components/icons/icon-back.svg";
import { runNoveltyAnalysis } from "@/lib/api/analysis";
import { ApiError } from "@/lib/api/error";

const ANALYSIS_MENU_ITEMS = [
  {
    key: "research",
    title: "재탐색하기",
    description: "청구항 구조 파악",
  },
  {
    key: "inventive-step",
    title: "진보성 분석",
    description: "기술 진보성 분석",
  },
  {
    key: "novelty",
    title: "신규성 분석",
    description: "선행기술 대비 분석",
  },
  {
    key: "report",
    title: "분석 리포트",
    description: "종합 보고서",
  },
] as const;

const NOVELTY_ANALYSIS_ERROR_MESSAGES: Record<string, string> = {
  C001: "잘못된 요청입니다.",
  N002: "신규성 분석을 위해 구성요소를 1개 이상 등록해주세요.",
  SC001: "로그인이 필요합니다.",
  CA002: "해당 사건에 접근할 권한이 없습니다.",
  CA001: "사건을 찾을 수 없습니다.",
  P001: "분석할 선행기술을 찾을 수 없습니다.",
  RQ002: "요청 횟수 제한을 초과했습니다. 잠시 후 다시 시도해주세요.",
  O001: "특허 검색 서버와 통신 중 오류가 발생했습니다.",
  PY001: "AI 검색 서버와 통신 중 오류가 발생했습니다.",
  PY002: "AI 서버 응답 시간이 초과되었습니다. 다시 시도해주세요.",
  PY003: "AI 서버 응답 형식이 올바르지 않습니다.",
  C002: "서버 내부 오류가 발생했습니다. 잠시 후 다시 시도해주세요.",
};

export function AnalysisMenu({
  caseId,
  title,
  showReport,
}: {
  caseId: string;
  title: string;
  showReport: boolean;
}) {
  const router = useRouter();
  const [isNoveltyAnalyzing, setIsNoveltyAnalyzing] = useState(false);
  const [noveltyAnalysisError, setNoveltyAnalysisError] = useState<string | null>(null);
  const titleQuery = `?title=${encodeURIComponent(title)}`;

  const handleNoveltyAnalysis = async () => {
    if (isNoveltyAnalyzing) return;

    setIsNoveltyAnalyzing(true);
    setNoveltyAnalysisError(null);

    try {
      await runNoveltyAnalysis(caseId);
      router.push(`/myhistory/${encodeURIComponent(caseId)}/novelty${titleQuery}`);
    } catch (error) {
      setNoveltyAnalysisError(
        error instanceof ApiError
          ? (NOVELTY_ANALYSIS_ERROR_MESSAGES[error.errorCode] ?? error.message)
          : "신규성 분석 요청 중 네트워크 오류가 발생했습니다."
      );
    } finally {
      setIsNoveltyAnalyzing(false);
    }
  };

  return (
    <div className="flex w-70 shrink-0 flex-col gap-2">
      <nav
        className="flex w-full flex-col items-center overflow-hidden rounded-lg border border-outline-sub bg-bg-surface"
        aria-label="활동 기록 분석 메뉴"
      >
        {ANALYSIS_MENU_ITEMS.filter((item) => item.key !== "report" || showReport).map((item) => {
          const isResearchItem = item.key === "research";
          const isNoveltyItem = item.key === "novelty";
          const isInventiveStepItem = item.key === "inventive-step";
          const isReportItem = item.key === "report";
          const isLoading = isNoveltyItem && isNoveltyAnalyzing;

          return (
            <button
              key={item.key}
              type="button"
              disabled={isLoading}
              aria-busy={isLoading}
              onClick={
                isResearchItem
                  ? () => router.push(`/search?caseId=${encodeURIComponent(caseId)}`)
                  : isNoveltyItem
                    ? handleNoveltyAnalysis
                    : isInventiveStepItem
                      ? () => router.push(`/analysis/${encodeURIComponent(caseId)}${titleQuery}`)
                      : isReportItem
                        ? () =>
                            router.push(
                              `/myhistory/${encodeURIComponent(caseId)}/report${titleQuery}`
                            )
                        : undefined
              }
              className="flex w-full cursor-pointer items-center justify-between border-b border-outline-sub py-4 pr-3 pl-3.5 text-left last:border-b-0 hover:bg-bg-neutral-hover disabled:cursor-wait disabled:bg-bg-neutral-hover"
            >
              <span className="flex min-w-0 flex-1 flex-col items-start">
                <span className="w-full text-body-emphasis-17 text-title-primary">
                  {isLoading ? "신규성 분석 중..." : item.title}
                </span>
                <span className="w-full text-body-15 text-body-disabled">
                  {isLoading ? "상위 선행기술을 분석하고 있습니다" : item.description}
                </span>
              </span>

              <BackIcon
                className="h-6 w-6 shrink-0 text-icon-neutral-default [&_path]:fill-current"
                aria-hidden
              />
            </button>
          );
        })}
      </nav>

      {noveltyAnalysisError && (
        <p role="alert" aria-live="polite" className="px-1 text-body-13 text-error-default">
          {noveltyAnalysisError}
        </p>
      )}
    </div>
  );
}
