"use client";

import Link from "next/link";
import { useState } from "react";
import { PatentImportModal } from "@/components/search/PatentImportModal";
import { Pagination } from "@/components/searchlist/Pagination";
import { ProjectList } from "@/components/searchlist/ProjectList";
import { ResultListHeader } from "@/components/searchlist/ResultListHeader";
import { SortingTag } from "@/components/searchlist/SortingTag";
import { BackButton } from "@/components/ui/BackButton";
import { Button } from "@/components/ui/Button";

const MOCK_RESULT_COUNT = 20;

const MOCK_RESULTS = Array.from({ length: 10 }, (_, index) => ({
  id: `patent-${index + 1}`,
  title: "KR 10-2023-0145XXX 저온 황산침출 기반 니켈·코발트 동시 회수 공정",
  organization: "한국지질자원연구원",
  year: 2024,
  tags: ["저온 침출", "습식제련", "Ni·Co 회수"],
  status: "등록",
  recommendationReason:
    "핵심 기능 키워드(저온/회수율) 직접 일치 · 폐리튬이온전지 적용 사례 명시 · 황산 사용량 30% 절감 청구",
}));

export default function SearchResultPage() {
  const [isPatentImportModalOpen, setIsPatentImportModalOpen] = useState(false);

  return (
    <div className="flex min-h-full w-full flex-col gap-6" aria-label="선행기술 탐색 결과">
      <div className="flex flex-col items-start gap-4">
        <BackButton />

        <h1 className="text-headline-emphasis-24 text-title-primary">
          탐색한 선행기술 <span className="text-primary-default">{MOCK_RESULT_COUNT}건</span>
        </h1>
      </div>

      <section className="flex h-[158.625rem] w-full flex-col items-center gap-4 self-stretch">
        <div className="flex w-full items-end justify-between self-stretch">
          <SortingTag label="관련도 순" options={["관련도 순", "최신순"]} />
          <Button
            size="sm"
            variant="primary"
            className="h-[2.3125rem] rounded-[0.375rem]"
            onClick={() => setIsPatentImportModalOpen(true)}
          >
            특허번호로 불러오기
          </Button>
        </div>

        <div className="flex flex-col items-center gap-9 self-stretch">
          <div className="flex w-full flex-col gap-4 self-stretch">
            <ResultListHeader variant="readonly" className="w-full" />

            {MOCK_RESULTS.map((result, index) => (
              <Link key={result.id} href={`/tech/${result.id}`} className="block w-full">
                <ProjectList
                  showCheckbox={false}
                  className="w-full cursor-pointer"
                  title={result.title}
                  organization={result.organization}
                  year={result.year}
                  tags={result.tags}
                  status={result.status}
                  relevanceLabel={index === 0 ? "매우 높음" : "높음"}
                  relevanceVariant={index === 0 ? "verygood" : "good"}
                  recommendationReason={result.recommendationReason}
                  thumbnailAlt={`${result.title} 대표 이미지`}
                />
              </Link>
            ))}
          </div>

          <Pagination page={1} totalPages={4} />
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
