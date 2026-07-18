import Link from "next/link";
import { BackButton } from "@/components/ui/BackButton";
import { AnalysisMenu } from "@/components/myhistory/AnalysisMenu";
import { AnalysisNotice } from "@/components/myhistory/AnalysisNotice";
import { Chip } from "@/components/myhistory/ProjectCardChip";
import { SelectableItemGroup } from "@/components/myhistory/SelectableItem";
import { ListSearchField } from "@/components/searchlist/ListSearchField";
import { ProjectList } from "@/components/searchlist/ProjectList";
import { ResultListHeader } from "@/components/searchlist/ResultListHeader";
import { SortingTag } from "@/components/searchlist/SortingTag";

const MOCK_PROJECT = {
  title: "생분해성 고분자 코팅 조성물",
  status: "선행 조사 중",
  company: "그린폴리머(주)",
  manager: "김도현",
  step: "기술 분석" as const,
};

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

export default async function ProjectDetailPage({ params }: { params: Promise<{ id: string }> }) {
  const { id } = await params;

  return (
    <div data-project-id={id} className="flex min-h-full w-full flex-col gap-6">
      <BackButton />

      <header className="flex w-full min-w-[63.3125rem] items-end justify-between">
        <div className="flex w-119 max-w-full flex-col items-start gap-2">
          <div className="flex w-full items-center gap-3">
            <h1 className="min-w-0 line-clamp-1 text-headline-emphasis-28 text-title-primary">
              {MOCK_PROJECT.title}
            </h1>
            <Chip variant="primary" className="flex h-auto shrink-0 py-1">
              {MOCK_PROJECT.status}
            </Chip>
          </div>
          <div className="flex items-center gap-1 text-body-17 text-caption-label">
            <span>{MOCK_PROJECT.company}</span>
            <span className="size-0.75 shrink-0 rounded-full bg-icon-neutral-subtle" aria-hidden />
            <span>{MOCK_PROJECT.manager}</span>
          </div>
        </div>

        <SelectableItemGroup currentStep={MOCK_PROJECT.step} />
      </header>

      <div className="flex w-full items-start gap-4 self-stretch">
        <section className="flex min-h-[30rem] min-w-0 flex-1 flex-col items-start gap-3 self-stretch rounded-[0.5rem] border border-outline-sub bg-bg-surface p-4">
          <div className="flex w-full items-start justify-between">
            <SortingTag label="적합도 순" className="rounded-[0.375rem]" />
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

        <div className="flex w-[17.5rem] shrink-0 flex-col gap-3">
          <AnalysisMenu />
          <AnalysisNotice />
        </div>
      </div>
    </div>
  );
}
