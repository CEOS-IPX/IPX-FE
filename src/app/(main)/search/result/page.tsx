"use client";

import Link from "next/link";
import { Suspense, useEffect, useState } from "react";
import { useSearchParams } from "next/navigation";
import { PatentImportModal } from "@/components/search/PatentImportModal";
import { Pagination } from "@/components/searchlist/Pagination";
import { ProjectList } from "@/components/searchlist/ProjectList";
import { ResultListHeader } from "@/components/searchlist/ResultListHeader";
import { SortingTag } from "@/components/searchlist/SortingTag";
import { BackButton } from "@/components/ui/BackButton";
import { Button } from "@/components/ui/Button";
import { getPriorArts } from "@/lib/api/search";
import type { PriorArt, PriorArtRelevance } from "@/types/search.type";

const RELEVANCE_LABEL: Record<PriorArtRelevance, string> = {
  VERY_HIGH: "매우 높음",
  HIGH: "높음",
  MEDIUM: "보통",
  LOW: "낮음",
  VERY_LOW: "매우 낮음",
};

const RELEVANCE_VARIANT: Record<
  PriorArtRelevance,
  "verygood" | "good" | "related" | "bad" | "hold"
> = {
  VERY_HIGH: "verygood",
  HIGH: "good",
  MEDIUM: "related",
  LOW: "bad",
  VERY_LOW: "hold",
};

function SearchResultContent() {
  const searchParams = useSearchParams();
  const caseId = searchParams.get("caseId");

  const [priorArts, setPriorArts] = useState<PriorArt[]>([]);
  const [totalCount, setTotalCount] = useState(0);
  const [isLoading, setIsLoading] = useState(() => Boolean(caseId));
  const [error, setError] = useState<string | null>(null);
  const [isPatentImportModalOpen, setIsPatentImportModalOpen] = useState(false);

  //선행기술 목록 불러오는 api
  useEffect(() => {
    if (!caseId) return;

    let cancelled = false;

    getPriorArts(Number(caseId))
      .then((result) => {
        if (cancelled) return;
        setPriorArts(result.priorArts);
        setTotalCount(result.totalCount);
        setError(null);
      })
      .catch((err) => {
        if (cancelled) return;
        setError(
          err instanceof Error && err.message
            ? err.message
            : "선행문헌 목록을 불러오는 중 오류가 발생했습니다."
        );
      })
      .finally(() => {
        if (cancelled) return;
        setIsLoading(false);
      });

    return () => {
      cancelled = true;
    };
  }, [caseId]);

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
          <SortingTag label="관련도 순" options={["관련도 순", "최신순"]} />
          <Button
            size="sm"
            variant="primary"
            className="h-9.25 rounded-md"
            onClick={() => setIsPatentImportModalOpen(true)}
          >
            특허번호로 불러오기
          </Button>
        </div>

        {error && <p className="text-body-15 text-error-default">{error}</p>}
        {isLoading && <p className="text-body-15 text-caption-label">불러오는 중...</p>}

        <div className="flex flex-col items-center gap-9 self-stretch">
          <div className="flex w-full flex-col gap-4 self-stretch">
            <ResultListHeader variant="readonly" className="w-full" />

            {priorArts.map((priorArt) => (
              <Link
                key={priorArt.priorArtId}
                href={`/tech/${priorArt.priorArtId}`}
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
                  thumbnailAlt={`${priorArt.title} 대표 이미지`}
                />
              </Link>
            ))}
          </div>

          <Pagination page={1} totalPages={1} />
        </div>
      </section>

      {isPatentImportModalOpen && (
        <PatentImportModal
          initialPatentNumber=""
          onClose={() => setIsPatentImportModalOpen(false)}
          onSubmit={() => setIsPatentImportModalOpen(false)}
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
