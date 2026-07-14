import Link from "next/link";
import BackIcon from "@/components/icons/icon-back.svg";
import { AnalysisMenu } from "@/components/myhistory/AnalysisMenu";
import { AnalysisNotice } from "@/components/myhistory/AnalysisNotice";
import { Chip } from "@/components/myhistory/ProjectCardChip";
import { SelectableItemGroup } from "@/components/myhistory/SelectableItem";
import { ListSearchField } from "@/components/searchlist/ListSearchField";
import { ResultListHeader } from "@/components/searchlist/ResultListHeader";
import { SortingTag } from "@/components/searchlist/SortingTag";

const MOCK_PROJECT = {
  title: "생분해성 고분자 코팅 조성물",
  status: "선행 조사 중",
  company: "그린폴리머(주)",
  manager: "김도현",
};

export default async function ProjectDetailPage({ params }: { params: Promise<{ id: string }> }) {
  const { id } = await params;

  return (
    <div data-project-id={id} className="flex min-h-full w-full flex-col gap-6">
      <Link
        href="/myhistory"
        aria-label="내 활동 기록으로 돌아가기"
        className="flex h-8 w-8 shrink-0 items-center justify-center rounded-full bg-bg-surface shadow-[0px_1px_6px_0px_rgba(144,155,165,0.36)]"
      >
        <BackIcon
          className="h-5 w-5 -scale-x-100 text-icon-neutral-emphasize [&_path]:fill-current"
          aria-hidden
        />
      </Link>

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

        <SelectableItemGroup />
      </header>

      <div className="flex w-full items-start gap-4 self-stretch">
        <section className="flex min-h-[30rem] min-w-0 flex-1 flex-col items-start gap-3 self-stretch rounded-[0.5rem] border border-outline-sub bg-bg-surface p-4">
          <div className="flex w-full items-start justify-between">
            <SortingTag label="적합도 순" className="rounded-[0.375rem]" />
            <ListSearchField aria-label="결과 내 검색" defaultValue="회수 공정" />
          </div>

          <ResultListHeader variant="readonly" className="w-full" />
        </section>

        <div className="flex w-[17.5rem] shrink-0 flex-col gap-3">
          <AnalysisMenu />
          <AnalysisNotice />
        </div>
      </div>
    </div>
  );
}
