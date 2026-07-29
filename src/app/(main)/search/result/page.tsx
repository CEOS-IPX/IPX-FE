"use client";

import Link from "next/link";
import { Suspense } from "react";
import { PatentImportModal } from "@/components/search/PatentImportModal";
import { ProjectList } from "@/components/searchlist/ProjectList";
import { ResultListHeader } from "@/components/searchlist/ResultListHeader";
import { SortingTag } from "@/components/searchlist/SortingTag";
import { BackButton } from "@/components/ui/BackButton";
import { Button } from "@/components/ui/Button";
import { RELEVANCE_LABEL, RELEVANCE_VARIANT } from "@/lib/priorArtRelevance";
import { PRIOR_ART_SORT_OPTIONS, type PriorArtSortOption } from "@/hooks/usePriorArtSort";
import { useSearchResult } from "@/hooks/useSearchResult";

function SearchResultContent() {
  const {
    techLinkQuery,
    totalCount,
    isLoading,
    error,
    sortedPriorArts,
    setSortOption,
    isPatentImportModalOpen,
    openImportModal,
    closeImportModal,
    isImporting,
    importError,
    handleImportPatentNumber,
  } = useSearchResult();

  return (
    <div className="flex min-h-full w-full flex-col gap-6" aria-label="선행기술 탐색 결과">
      <div className="flex flex-col items-start gap-4">
        <BackButton />

        <h1 className="text-headline-emphasis-24 text-title-primary">
          탐색한 선행기술 <span className="text-primary-default">{totalCount}건</span>
        </h1>
      </div>

      <section className="flex h-[158.625rem] w-full flex-col items-center gap-4 self-stretch">
        <div className="flex w-full items-end justify-between self-stretch">
          <SortingTag
            label="관련도 순"
            options={[...PRIOR_ART_SORT_OPTIONS]}
            onChange={(value) => setSortOption(value as PriorArtSortOption)}
          />

          <Button
            size="sm"
            variant="primary"
            className="h-9.25 rounded-md"
            onClick={openImportModal}
          >
            출원번호로 불러오기
          </Button>
        </div>

        {error && <p className="text-body-15 text-error-default">{error}</p>}
        {isLoading && <p className="text-body-15 text-caption-label">불러오는 중...</p>}

        <div className="flex flex-col items-center gap-9 self-stretch">
          <div className="flex w-full flex-col gap-4 self-stretch">
            <ResultListHeader variant="readonly" className="w-full" />

            {sortedPriorArts.map((priorArt) => (
              <Link
                key={priorArt.priorArtId}
                href={`/tech/${priorArt.priorArtId}${techLinkQuery}`}
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
                />
              </Link>
            ))}
          </div>
        </div>
      </section>

      {isPatentImportModalOpen && (
        <PatentImportModal
          initialPatentNumber=""
          onClose={closeImportModal}
          onSubmit={handleImportPatentNumber}
          error={importError}
          isSubmitting={isImporting}
        />
      )}
    </div>
  );
}

export default function SearchResultPage() {
  return (
    <Suspense fallback={null}>
      <SearchResultContent />
    </Suspense>
  );
}
