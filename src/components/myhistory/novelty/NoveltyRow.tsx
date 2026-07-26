import { MatchStatusChip, type MatchStatus } from "./MatchStatusChip";
import type { NoveltyComparison, NoveltyComparisonResult } from "@/types/novelty.type";

const MATCH_STATUS_BY_RESULT: Record<NoveltyComparisonResult, MatchStatus> = {
  IDENTICAL: "identical",
  SIMILAR: "similar",
  NOVEL: "novel",
};

interface NoveltyRowProps {
  comparison: NoveltyComparison;
}

export function NoveltyRow({ comparison }: NoveltyRowProps) {
  return (
    <div className="grid grid-cols-[1fr_2fr_100px] items-center gap-4 px-4 py-5">
      <div className="flex items-center gap-3">
        <span className="flex h-9 w-9 shrink-0 items-center justify-center rounded-lg bg-bg-elementlist text-label-emphasis-15 text-primary-sub">
          {comparison.componentLabel}
        </span>

        <div className="flex flex-col">
          <p className="text-label-emphasis-17 text-title-secondary">{comparison.componentName}</p>
          <p className="text-label-13 text-caption-label"> 수단</p>
        </div>
      </div>

      <div className="flex min-w-0 flex-col gap-1">
        <p className="text-label-15 text-caption-label">{comparison.disclosureText}</p>
        {comparison.citation && (
          <p className="text-body-13 text-body-disabled">{comparison.citation}</p>
        )}
      </div>

      <div className="flex mr-2.5 justify-end">
        <MatchStatusChip matchStatus={MATCH_STATUS_BY_RESULT[comparison.comparisonResult]} />
      </div>
    </div>
  );
}
