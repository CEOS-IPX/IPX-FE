"use client";

import { useAnalysisStore } from "@/store/analysisStore";
import { Button } from "@/components/ui/Button";
import { InfoCard } from "@/components/analysis/AnalysisRightPanel/InfoCard";
import { ExplainSection } from "@/components/analysis/AnalysisRightPanel/ExplainSection";

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
        <Button>기술 진보성 분석</Button>
      </div>
    </div>
  );
}
