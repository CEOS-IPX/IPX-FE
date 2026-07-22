"use client";

import { useEffect, useState } from "react";
import { useParams } from "next/navigation";
import ExternalIcon from "@/components/icons/icon-external.svg";
import { ExplainSection } from "@/components/analysis/AnalysisRightPanel/ExplainSection";
import { InfoCard } from "@/components/analysis/AnalysisRightPanel/InfoCard";
import { Chip } from "@/components/searchlist/Chip";
import { StatusBadge } from "@/components/searchlist/StatusBadge";
import { TagChip } from "@/components/searchlist/TagChip";
import { BackButton } from "@/components/ui/BackButton";
import { Button } from "@/components/ui/Button";
import { getPriorArtDetail } from "@/lib/api/search";
import type { PriorArtDetail } from "@/types/search.type";

// 백엔드 legalStatus enum 전체 목록이 확인되지 않아 확인된 값만 매핑, 나머지는 원본 값 그대로 표시
const LEGAL_STATUS_LABEL: Record<string, string> = {
  REGISTERED: "등록",
};

// rrfScore -> 관련도 등급 변환 기준(백엔드 확정 스펙 없음, 우선 프론트에서 추정한 임시 기준)
function getRelevance(rrfScore: number): {
  label: string;
  variant: "verygood" | "good" | "related" | "bad" | "hold";
} {
  if (rrfScore >= 0.8) return { label: "매우 높음", variant: "verygood" };
  if (rrfScore >= 0.6) return { label: "높음", variant: "good" };
  if (rrfScore >= 0.4) return { label: "보통", variant: "related" };
  if (rrfScore >= 0.2) return { label: "낮음", variant: "bad" };
  return { label: "매우 낮음", variant: "hold" };
}

function formatPeriod(from?: string | null, to?: string | null): string {
  if (!from || !to) return "-";
  const fromDate = new Date(from);
  const toDate = new Date(to);
  if (Number.isNaN(fromDate.getTime()) || Number.isNaN(toDate.getTime())) return "-";

  let months =
    (toDate.getFullYear() - fromDate.getFullYear()) * 12 +
    (toDate.getMonth() - fromDate.getMonth());
  if (toDate.getDate() < fromDate.getDate()) months -= 1;
  if (months < 0) return "-";

  const years = Math.floor(months / 12);
  const remainMonths = months % 12;
  if (years === 0) return `${remainMonths}개월`;
  if (remainMonths === 0) return `${years}년`;
  return `${years}년 ${remainMonths}개월`;
}

export default function TechDetailPage() {
  const params = useParams<{ id: string }>();
  const priorArtId = params.id;

  const [detail, setDetail] = useState<PriorArtDetail | null>(null);
  const [isLoading, setIsLoading] = useState(() => Boolean(priorArtId));
  const [error, setError] = useState<string | null>(null);

  //선행문헌 상세 조회
  useEffect(() => {
    if (!priorArtId) return;

    let cancelled = false;

    getPriorArtDetail(Number(priorArtId))
      .then((result) => {
        if (cancelled) return;

        setDetail(result);
        setError(null);
      })
      .catch((err) => {
        if (cancelled) return;

        setError(
          err instanceof Error && err.message
            ? err.message
            : "선행문헌 상세를 불러오는 중 오류가 발생했습니다."
        );
      })
      .finally(() => {
        if (cancelled) return;
        setIsLoading(false);
      });

    return () => {
      cancelled = true;
    };
  }, [priorArtId]);

  if (isLoading) {
    return (
      <div className="flex min-h-full w-full flex-1 flex-col items-center gap-6 self-stretch px-10 py-6">
        <p className="text-body-15 text-caption-label">불러오는 중...</p>
      </div>
    );
  }

  if (error || !detail) {
    return (
      <div
        data-tech-id={priorArtId}
        className="flex min-h-full w-full flex-1 flex-col items-start gap-6 self-stretch px-10 py-6"
      >
        <BackButton />
        <p className="text-body-15 text-error-default">
          {error ?? "선행문헌 정보를 불러오지 못했습니다."}
        </p>
      </div>
    );
  }

  const legalStatusLabel = detail.legalStatus
    ? (LEGAL_STATUS_LABEL[detail.legalStatus] ?? detail.legalStatus)
    : "-";
  const relevance = getRelevance(detail.rrfScore);
  const patentNumber = detail.registrationNumber || detail.applicationNumber;
  const mainFeatures = detail.keyFeatures.length > 0 ? detail.keyFeatures.join(", ") : "-";

  return (
    <div
      data-tech-id={priorArtId}
      className="flex min-h-full w-full flex-1 flex-col items-center gap-6 self-stretch px-10 py-6"
    >
      <div className="flex w-full flex-1 flex-col items-start gap-9 self-stretch">
        <div className="flex w-full flex-col items-start gap-6 self-stretch">
          <BackButton />

          <header className="flex w-full items-end gap-9 self-stretch">
            <div className="flex min-w-0 flex-1 items-start gap-5.25">
              <div
                role="img"
                aria-label="선행기술 대표 이미지"
                className="flex size-25 shrink-0 aspect-square items-center justify-center gap-2.5 rounded-sm border border-outline-sub bg-bg-neutral-subtle bg-cover bg-center bg-no-repeat p-2.5"
              />

              <div className="flex min-w-0 flex-1 flex-col items-start gap-2">
                <div className="flex w-full min-w-0 items-center gap-2 self-stretch">
                  <h1 className="min-w-0 line-clamp-1 text-headline-emphasis-24 text-title-primary">
                    {detail.title || "-"}
                  </h1>
                  <Chip variant="primary" className="shrink-0">
                    {legalStatusLabel}
                  </Chip>
                </div>

                <div className="flex min-w-0 items-center gap-3 text-title-18 text-body-disabled">
                  <span className="shrink-0">{patentNumber}</span>
                  <span aria-hidden>|</span>
                  <span className="min-w-0 truncate">{detail.applicantName || "-"}</span>
                </div>
              </div>
            </div>

            <Button
              size="sm"
              variant="secondary"
              className="h-10.25 shrink-0 gap-1 rounded-md py-2.5 pr-4 pl-3"
            >
              <ExternalIcon className="size-5 shrink-0 [&_path]:fill-current" aria-hidden />
              원문보기
            </Button>
          </header>
        </div>

        <div className="flex w-full items-start gap-6 self-stretch">
          <div className="flex min-w-0 flex-1 flex-col items-start gap-12 self-stretch">
            <div className="flex w-full items-stretch gap-2 self-stretch">
              <InfoCard
                label="출원"
                value={detail.applicationDate || "-"}
                className="border-0 bg-bg-neutral-hover"
              />
              <InfoCard
                label="등록"
                value={detail.registrationDate || "-"}
                className="border-0 bg-bg-neutral-hover"
              />
              <InfoCard
                label="출원-등록 기간"
                value={formatPeriod(detail.applicationDate, detail.registrationDate)}
                className="border-0 bg-bg-neutral-hover"
              />
              <InfoCard
                label="현재 상태"
                value={legalStatusLabel}
                className="border-0 bg-bg-neutral-hover"
              />
            </div>

            <div className="flex w-full flex-col items-start gap-12 self-stretch">
              <ExplainSection title="핵심 요약" content={detail.summary || "-"} />
              <ExplainSection title="기술목적" content={detail.techPurpose || "-"} />
              <ExplainSection title="주요 특징" content={mainFeatures} />
            </div>
          </div>

          <aside
            aria-label="선행기술 부가 정보"
            className="flex w-97.5 shrink-0 flex-col items-start gap-9 rounded-lg border border-outline-sub bg-bg-surface p-8"
          >
            <section className="flex w-full flex-col items-start justify-center gap-2 self-stretch">
              <h2 className="self-stretch text-title-18 text-title-primary">관련도</h2>
              <StatusBadge variant={relevance.variant}>{relevance.label}</StatusBadge>
            </section>

            <section className="flex w-full flex-col items-start gap-3 self-stretch">
              <h2 className="self-stretch text-title-18 text-title-primary">추천 이유</h2>
              <p className="self-stretch text-body-15 text-body-primary">{detail.reason || "-"}</p>
            </section>

            <section className="flex w-full flex-col items-start gap-3 self-stretch">
              <h2 className="self-stretch text-title-18 text-title-primary">관련 키워드</h2>
              <div className="flex w-79.5 max-w-full flex-wrap content-start items-start gap-3">
                {detail.matchedKeywords.map((keyword) => (
                  <TagChip key={keyword} label={keyword} />
                ))}
              </div>
            </section>
          </aside>
        </div>
      </div>
    </div>
  );
}
