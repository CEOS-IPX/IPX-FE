import { MatchStatusChip } from "./MatchStatusChip";
import type { NoveltyComparison } from "./NoveltyTable";

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

        <p className="text-label-emphasis-17 text-title-secondary">{comparison.componentName}</p>
      </div>

      <p className="text-label-15 text-caption-label">{comparison.priorArtExcerpt}</p>

      <div className="flex mr-2.5 justify-end">
        <MatchStatusChip matchStatus={comparison.matchStatus} />
      </div>
    </div>
  );
}
