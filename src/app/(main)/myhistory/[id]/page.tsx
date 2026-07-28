"use client";

import Link from "next/link";
import { useParams } from "next/navigation";
import { BackButton } from "@/components/ui/BackButton";
import { AnalysisMenu } from "@/components/myhistory/AnalysisMenu";
import { AnalysisNotice } from "@/components/myhistory/AnalysisNotice";
import { Chip } from "@/components/myhistory/ProjectCardChip";
import { SelectableItemGroup } from "@/components/myhistory/SelectableItem";
import { ListSearchField } from "@/components/searchlist/ListSearchField";
import { ProjectList } from "@/components/searchlist/ProjectList";
import { ResultListHeader } from "@/components/searchlist/ResultListHeader";
import { SortingTag } from "@/components/searchlist/SortingTag";
import { useCaseDetail, deriveCompletedSteps } from "@/hooks/useCaseDetail";
import { usePriorArtsList } from "@/hooks/usePriorArtsList";
import { useTitleFilter } from "@/hooks/useTitleFilter";
import {
  PRIOR_ART_SORT_OPTIONS,
  usePriorArtSort,
  type PriorArtSortOption,
} from "@/hooks/usePriorArtSort";
import { RELEVANCE_LABEL, RELEVANCE_VARIANT } from "@/lib/priorArtRelevance";

export default function ProjectDetailPage() {
  const params = useParams<{ id: string }>();
  const id = params.id;

  const { detail, isLoading, error } = useCaseDetail(id);
  const { priorArts, isLoading: isPriorArtsLoading, error: priorArtsError } = usePriorArtsList(id);
  const {
    query,
    setQuery,
    filtered: filteredPriorArts,
  } = useTitleFilter(priorArts, (priorArt) => priorArt.title);
  const { setSortOption, sorted: sortedPriorArts } = usePriorArtSort(filteredPriorArts);

  if (isLoading) {
    return (
      <div data-project-id={id} className="flex min-h-full w-full flex-col gap-6">
        <BackButton />
        <p className="text-body-15 text-caption-label">불러오는 중...</p>
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

  const showReport = detail.reportAvailable;

  return (
    <div data-project-id={id} className="flex min-h-full w-full flex-col gap-6">
      <BackButton />

      <header className="flex w-full min-w-253.25 items-end justify-between">
        <div className="flex min-w-0 flex-1 flex-col items-start gap-2">
          <div className="flex w-full items-start gap-3">
            <h1 className="min-w-0 line-clamp-2 text-headline-emphasis-28 text-title-primary">
              {detail.title}
            </h1>

            <Chip variant="primary" className="mt-1 flex h-auto shrink-0 py-1">
              {detail.statusLabel}
            </Chip>
          </div>
          <div className="flex items-center gap-1 text-body-17 text-caption-label">
            <span>{detail.applicantName ?? "-"}</span>
            <span className="size-0.75 shrink-0 rounded-full bg-icon-neutral-subtle" aria-hidden />
            <span>{detail.inventorName ?? "-"}</span>
          </div>
        </div>

        <SelectableItemGroup completed={deriveCompletedSteps(detail)} />
      </header>

      <div className="flex w-full items-start gap-4 self-stretch">
        <section className="flex min-h-120 min-w-0 flex-1 flex-col items-start gap-3 self-stretch rounded-lg border border-outline-sub bg-bg-surface p-4">
          <div className="flex w-full items-start justify-between">
            <SortingTag
              label="관련도 순"
              options={[...PRIOR_ART_SORT_OPTIONS]}
              className="rounded-md"
              onChange={(value) => setSortOption(value as PriorArtSortOption)}
            />
            <ListSearchField
              aria-label="프로젝트 내 검색"
              placeholder="프로젝트 내 검색"
              value={query}
              onChange={(event) => setQuery(event.target.value)}
              onClear={() => setQuery("")}
            />
          </div>

          <div className="flex w-full flex-col gap-4">
            <ResultListHeader variant="readonly" className="w-full" />

            {priorArtsError && <p className="text-body-15 text-error-default">{priorArtsError}</p>}
            {isPriorArtsLoading && (
              <p className="text-body-15 text-caption-label">불러오는 중...</p>
            )}

            {sortedPriorArts.map((priorArt) => (
              <Link
                key={priorArt.priorArtId}
                href={`/tech/${priorArt.priorArtId}?title=${encodeURIComponent(detail.title)}`}
                className="block w-full"
              >
                <ProjectList
                  showCheckbox={false}
                  className="w-full cursor-pointer"
                  title={priorArt.title}
                  organization={priorArt.applicantName}
                  year={priorArt.applicationDate.slice(0, 4)}
                  tags={priorArt.keywords}
                  status={priorArt.legalStatus}
                  relevanceLabel={RELEVANCE_LABEL[priorArt.relevance]}
                  relevanceVariant={RELEVANCE_VARIANT[priorArt.relevance]}
                  recommendationReason={priorArt.reason}
                  applicationNumber={priorArt.applicationNumber}
                  thumbnailAlt={`${priorArt.title} 대표 이미지`}
                  highlight={query || undefined}
                />
              </Link>
            ))}
          </div>
        </section>

        <div className="flex w-70 shrink-0 flex-col gap-3">
          <AnalysisMenu caseId={id} title={detail.title} showReport={showReport} />
          {!showReport && <AnalysisNotice />}
        </div>
      </div>
    </div>
  );
}
