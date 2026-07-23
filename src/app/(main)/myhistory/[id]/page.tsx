"use client";

import { useEffect, useState } from "react";
import Link from "next/link";
import { useParams } from "next/navigation";
import { BackButton } from "@/components/ui/BackButton";
import { AnalysisMenu } from "@/components/myhistory/AnalysisMenu";
import { AnalysisNotice } from "@/components/myhistory/AnalysisNotice";
import { Chip } from "@/components/myhistory/ProjectCardChip";
import { SelectableItemGroup, type ProjectStep } from "@/components/myhistory/SelectableItem";
import { ListSearchField } from "@/components/searchlist/ListSearchField";
import { ProjectList } from "@/components/searchlist/ProjectList";
import { ResultListHeader } from "@/components/searchlist/ResultListHeader";
import { SortingTag } from "@/components/searchlist/SortingTag";
import { getCaseDetail } from "@/lib/api/case";
import { ApiError } from "@/lib/api/error";
import type { CaseDetail } from "@/types/case.type";

// 에러코드별 메시지 정리해놓음
const CASE_DETAIL_ERROR_MESSAGES: Record<string, string> = {
  AU004: "인증이 필요합니다.",
  SC001: "인증이 필요합니다.",
  CA002: "해당 사건에 접근할 권한이 없습니다.",
  CA001: "사건을 찾을 수 없습니다.",
  C002: "서버 내부 오류가 발생했습니다.",
};

// 백엔드가 진행 단계(currentStep)를 직접 안 줘서, 완료 시각 필드들로 프론트에서 추정
function deriveCurrentStep(detail: CaseDetail): ProjectStep {
  if (detail.reportCompletedAt) return "분석 리포트";
  if (detail.noveltyCompletedAt || detail.inventiveCompletedAt) return "기술 분석";
  return "구성요소 분해";
}

// 이 부분은 테스트용! (저장된 선행문헌 목록은 별도 API로 연동 예정)
const MOCK_RESULTS = [
  {
    id: "patent-1",
    title: "KR 10-2023-0145XXX 저온 황산침출 기반 니켈·코발트 동시 회수 공정",
    organization: "한국지질자원연구원",
    year: 2024,
    tags: ["저온 침출", "습식제련", "Ni·Co 회수"],
    status: "등록",
    relevanceLabel: "매우 높음",
    recommendationReason:
      "핵심 기능 키워드(저온/회수율) 직접 일치 · 폐리튬이온전지 적용 사례 명시 · 황산 사용량 30% 절감 청구",
  },
  {
    id: "patent-2",
    title: "KR 10-2023-0145XXX 저온 황산침출 기반 니켈·코발트 동시 회수 공정",
    organization: "한국지질자원연구원",
    year: 2024,
    tags: ["저온 침출", "습식제련", "Ni·Co 회수"],
    status: "등록",
    relevanceLabel: "매우 높음",
    recommendationReason:
      "핵심 기능 키워드(저온/회수율) 직접 일치 · 폐리튬이온전지 적용 사례 명시 · 황산 사용량 30% 절감 청구",
  },
  {
    id: "patent-3",
    title: "KR 10-2023-0145XXX 저온 황산침출 기반 니켈·코발트 동시 회수 공정",
    organization: "한국지질자원연구원",
    year: 2024,
    tags: ["저온 침출", "습식제련", "Ni·Co 회수"],
    status: "등록",
    relevanceLabel: "매우 높음",
    recommendationReason:
      "핵심 기능 키워드(저온/회수율) 직접 일치 · 폐리튬이온전지 적용 사례 명시 · 황산 사용량 30% 절감 청구",
  },
];

export default function ProjectDetailPage() {
  const params = useParams<{ id: string }>();
  const id = params.id;

  const [detail, setDetail] = useState<CaseDetail | null>(null);
  const [isLoading, setIsLoading] = useState(() => Boolean(id));
  const [error, setError] = useState<string | null>(null);

  //프로젝트 별 저장된 특허 목록 조회 api
  useEffect(() => {
    if (!id) return;

    let cancelled = false;

    getCaseDetail(Number(id))
      .then((result) => {
        if (cancelled) return;

        setDetail(result);
        setError(null);
      })
      .catch((err) => {
        if (cancelled) return;

        if (err instanceof ApiError) {
          setError(
            CASE_DETAIL_ERROR_MESSAGES[err.errorCode] ||
              err.message ||
              "사건 정보를 불러오는 중 오류가 발생했습니다."
          );
        } else {
          setError("사건 정보를 불러오는 중 오류가 발생했습니다.");
        }
      })
      .finally(() => {
        if (cancelled) return;
        setIsLoading(false);
      });

    return () => {
      cancelled = true;
    };
  }, [id]);

  if (isLoading) {
    return (
      <div data-project-id={id} className="flex min-h-full w-full flex-col gap-6">
        <BackButton />
        <p className="text-body-15 text-caption-label">저장된 특허 목록을 불러오는 중...</p>
      </div>
    );
  }

  if (error || !detail) {
    return (
      <div data-project-id={id} className="flex min-h-full w-full flex-col gap-6">
        <BackButton />
        <p className="text-body-15 text-error-default">
          {error ?? "사건 정보를 불러오지 못했습니다."}
        </p>
      </div>
    );
  }

  return (
    <div data-project-id={id} className="flex min-h-full w-full flex-col gap-6">
      <BackButton />

      <header className="flex w-full min-w-253.25 items-end justify-between">
        <div className="flex w-119 max-w-full flex-col items-start gap-2">
          <div className="flex w-full items-center gap-3">
            <h1 className="min-w-0 line-clamp-1 text-headline-emphasis-28 text-title-primary">
              {detail.title}
            </h1>
            <Chip variant="primary" className="flex h-auto shrink-0 py-1">
              {detail.statusLabel}
            </Chip>
          </div>
          <div className="flex items-center gap-1 text-body-17 text-caption-label">
            <span>{detail.applicantName ?? "-"}</span>
            <span className="size-0.75 shrink-0 rounded-full bg-icon-neutral-subtle" aria-hidden />
            <span>{detail.inventorName ?? "-"}</span>
          </div>
        </div>

        <SelectableItemGroup currentStep={deriveCurrentStep(detail)} />
      </header>

      <div className="flex w-full items-start gap-4 self-stretch">
        <section className="flex min-h-120 min-w-0 flex-1 flex-col items-start gap-3 self-stretch rounded-lg border border-outline-sub bg-bg-surface p-4">
          <div className="flex w-full items-start justify-between">
            <SortingTag label="적합도 순" className="rounded-md" />
            <ListSearchField aria-label="프로젝트 내 검색" placeholder="프로젝트 내 검색" />
          </div>

          <div className="flex w-full flex-col gap-4">
            <ResultListHeader variant="readonly" className="w-full" />

            {MOCK_RESULTS.map((result) => (
              <Link key={result.id} href={`/tech/${result.id}`} className="block w-full">
                <ProjectList
                  showCheckbox={false}
                  className="w-full cursor-pointer"
                  title={result.title}
                  organization={result.organization}
                  year={result.year}
                  tags={result.tags}
                  status={result.status}
                  relevanceLabel={result.relevanceLabel}
                  relevanceVariant="verygood"
                  recommendationReason={result.recommendationReason}
                  thumbnailAlt={`${result.title} 대표 이미지`}
                />
              </Link>
            ))}
          </div>
        </section>

        <div className="flex w-70 shrink-0 flex-col gap-3">
          <AnalysisMenu />
          <AnalysisNotice />
        </div>
      </div>
    </div>
  );
}
