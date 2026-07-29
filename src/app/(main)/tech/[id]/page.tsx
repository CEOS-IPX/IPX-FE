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
import { ApiError } from "@/lib/api/error";
import { useKiprisThumbnail } from "@/hooks/useKiprisThumbnail";
import { formatPeriod } from "@/lib/priorArtFormat";
import { buildOriginalDocumentUrl } from "@/lib/patentOriginalDocument";
import { RELEVANCE_LABEL, RELEVANCE_VARIANT } from "@/lib/priorArtRelevance";
import type { PriorArtDetail } from "@/types/search.type";

// 선행문헌 상세 조회 api 에러코드별 메시지
const PRIOR_ART_DETAIL_ERROR_MESSAGES: Record<string, string> = {
  SC001: "인증이 필요합니다.",
  CA002: "해당 사건에 접근할 권한이 없습니다.",
  P001: "해당 선행기술을 찾을 수 없습니다.",
  P003: "선행기술 문서를 찾을 수 없습니다.",
  O001: "특허 검색 서버와 통신 중 오류가 발생했습니다.",
  C002: "서버 내부 오류가 발생했습니다.",
};

export default function TechDetailPage() {
  const params = useParams<{ id: string }>();
  const priorArtId = params.id;

  const [detail, setDetail] = useState<PriorArtDetail | null>(null);
  const [isLoading, setIsLoading] = useState(() => Boolean(priorArtId));
  const [error, setError] = useState<string | null>(null);
  const thumbnailUrl = useKiprisThumbnail(detail?.applicationNumber);

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

        if (err instanceof ApiError) {
          setError(
            PRIOR_ART_DETAIL_ERROR_MESSAGES[err.errorCode] ||
              err.message ||
              "선행문헌 상세를 불러오는 중 오류가 발생했습니다."
          );
        } else {
          setError("선행문헌 상세를 불러오는 중 오류가 발생했습니다.");
        }
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

  const legalStatusLabel = detail.legalStatus ?? "-";
  const relevance = detail.relevance;
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
                role={thumbnailUrl ? "img" : undefined}
                aria-label={thumbnailUrl ? "선행기술 대표 이미지" : undefined}
                className="flex size-25 shrink-0 aspect-square items-center justify-center gap-2.5 rounded-sm border border-outline-sub bg-bg-neutral-subtle bg-cover bg-center bg-no-repeat p-2.5"
                style={thumbnailUrl ? { backgroundImage: `url("${thumbnailUrl}")` } : undefined}
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
              disabled={!buildOriginalDocumentUrl(detail.applicationNumber)}
              onClick={() => {
                const url = buildOriginalDocumentUrl(detail.applicationNumber);
                if (url) window.open(url, "_blank", "noopener,noreferrer");
              }}
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
              <StatusBadge variant={RELEVANCE_VARIANT[relevance]}>
                {RELEVANCE_LABEL[relevance]}
              </StatusBadge>
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
