"use client";

import { useState } from "react";
import { useParams, useRouter } from "next/navigation";
import { useAnalysisStore } from "@/store/analysisStore";
import { Button } from "@/components/ui/Button";
import { InfoCard } from "@/components/analysis/AnalysisRightPanel/InfoCard";
import { ExplainSection } from "@/components/analysis/AnalysisRightPanel/ExplainSection";
import { runInventiveStepAnalysis } from "@/lib/api/analysis";
import { ApiError } from "@/lib/api/error";

const APPLICATION_NUMBER_PATTERN = /^\d{2}-?\d{4}-?\d{7}$/;

const INVENTIVE_STEP_ERROR_MESSAGES: Record<string, string> = {
  C001: "주인용 특허의 출원번호 형식을 확인해주세요.",
  N002: "진보성 분석을 위해 구성요소를 1개 이상 등록해주세요.",
  I001: "부인용으로 사용할 선행기술 후보가 없습니다.",
  SC001: "로그인이 필요합니다.",
  CA002: "해당 사건에 접근할 권한이 없습니다.",
  CA001: "사건을 찾을 수 없습니다.",
  P001: "분석할 선행기술을 찾을 수 없습니다.",
  P004: "선행기술 문서를 찾을 수 없습니다.",
  RQ002: "요청 횟수 제한을 초과했습니다. 잠시 후 다시 시도해주세요.",
  O001: "특허 검색 서버와 통신 중 오류가 발생했습니다.",
  PY001: "AI 검색 서버와 통신 중 오류가 발생했습니다.",
  PY002: "AI 서버 응답 시간이 초과되었습니다. 다시 시도해주세요.",
  C002: "서버 내부 오류가 발생했습니다. 잠시 후 다시 시도해주세요.",
};

export function AnalysisRightPanel() {
  const selectedPatent = useAnalysisStore((s) => s.selectedPatent);

  if (!selectedPatent) {
    return <DefaultPanel />;
  }

  return <PatentDetailPanel patent={selectedPatent} />;
}

function DefaultPanel() {
  return (
    <div className="flex h-full flex-col px-9 pt-9 pb-10">
      <p className="text-headline-24 text-title-primary">선행기술 선택</p>
      <p className="mt-2 text-body-emphasis-15 text-caption-label">
        선택하신 기술을 주인용으로, AI가 자동 판별한 기술을 부인용으로 채택하여 기술 분석을
        진행합니다
      </p>

      <Button disabled className="mt-auto">
        기술 진보성 분석
      </Button>
    </div>
  );
}

function PatentDetailPanel({
  patent,
}: {
  patent: NonNullable<ReturnType<typeof useAnalysisStore.getState>["selectedPatent"]>;
}) {
  const router = useRouter();
  const { id: caseId } = useParams<{ id: string }>();
  const [isAnalyzing, setIsAnalyzing] = useState(false);
  const [analysisError, setAnalysisError] = useState<string | null>(null);

  const handleInventiveStepAnalysis = async () => {
    if (isAnalyzing) return;

    if (!caseId) {
      setAnalysisError("사건 정보를 확인할 수 없습니다.");
      return;
    }

    const primaryApplicationNumber = patent.patentNumber.replace(/^KR\s*/i, "").replace(/\s/g, "");

    if (!APPLICATION_NUMBER_PATTERN.test(primaryApplicationNumber)) {
      setAnalysisError("주인용 특허의 출원번호 형식을 확인해주세요.");
      return;
    }

    setIsAnalyzing(true);
    setAnalysisError(null);

    try {
      await runInventiveStepAnalysis(caseId, { primaryApplicationNumber });
      router.push(
        `/analysis/${encodeURIComponent(caseId)}/${encodeURIComponent(String(patent.id))}`
      );
    } catch (error) {
      setAnalysisError(
        error instanceof ApiError
          ? (INVENTIVE_STEP_ERROR_MESSAGES[error.errorCode] ?? error.message)
          : "진보성 분석 요청 중 네트워크 오류가 발생했습니다."
      );
    } finally {
      setIsAnalyzing(false);
    }
  };

  return (
    <div className="flex h-full flex-col">
      <div className="flex-1 overflow-y-auto p-9 scrollbar-hide">
        <div className="flex w-full flex-col items-start gap-9 self-stretch">
          <div className="flex w-full flex-col items-start gap-1 self-stretch">
            <p className="w-full line-clamp-1 text-title-emphasis-22 text-title-primary">
              {patent.title}
            </p>

            <div className="flex items-center gap-3 text-title-18 text-body-disabled">
              <p className="shrink-0">{patent.patentNumber}</p>
              <span aria-hidden>|</span>
              <p className="min-w-0 truncate">{patent.organization}</p>
            </div>
          </div>

          <div className="grid w-full grid-cols-2 gap-2 self-stretch">
            <InfoCard label="출원" value={patent.applicationDate} />
            <InfoCard label="등록" value={patent.registrationDate} />
            <InfoCard label="출원-등록 기간" value={patent.applicationPeriod} />
            <InfoCard
              label="현재 상태"
              value={patent.currentStatus}
              subValue={patent.expirationDate ? "~" + patent.expirationDate : undefined}
            />
          </div>

          <div className="flex w-full flex-col items-start gap-12 self-stretch">
            <ExplainSection title="핵심 요약" content={patent.summary} />
            <ExplainSection title="기술목적" content={patent.purpose} />
            <ExplainSection title="주요 특징" content={patent.mainFeatures} />
          </div>
        </div>
      </div>

      <div className="shrink-0 px-9 pb-10 pt-6">
        {analysisError && (
          <p role="alert" aria-live="polite" className="mb-3 text-body-13 text-error-default">
            {analysisError}
          </p>
        )}
        <Button
          disabled={isAnalyzing}
          aria-busy={isAnalyzing}
          onClick={handleInventiveStepAnalysis}
        >
          {isAnalyzing ? "진보성 분석 중..." : "기술 진보성 분석"}
        </Button>
      </div>
    </div>
  );
}
