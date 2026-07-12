import type { MatchStatus } from "./MatchStatusChip";
import { NoveltyRow } from "./NoveltyRow";

// API 명세(comparisons[]) 기준
export interface NoveltyComparison {
  comparisonId: number;
  componentId: number;
  componentLabel: string;
  componentName: string;
  priorArtId: number;
  dLabel: string;
  applicationNumber: string;
  priorArtTitle?: string | null;
  matchStatus: MatchStatus;
  priorArtExcerpt?: string | null;
}

interface NoveltyTableProps {
  comparisons: NoveltyComparison[];
}

export default function NoveltyTable({ comparisons }: NoveltyTableProps) {
  const dLabel = comparisons[0]?.dLabel;

  return (
    <div className="w-full overflow-hidden border-y border-outline-sub">
      <div className="grid grid-cols-[1fr_2fr_100px] items-center gap-4 bg-bg-neutral-hover px-4 py-3">
        <span className="text-label-15 text-body-disabled">발명 구성요소</span>
        <span className="text-label-15 text-body-disabled">
          주인용발명{dLabel ? `(${dLabel})` : ""}의 대응 게시 내용
        </span>
        <span className="text-right text-label-15 text-body-disabled">대비 결과</span>
      </div>

      <div>
        {comparisons.map((comparison) => (
          <NoveltyRow key={comparison.comparisonId} comparison={comparison} />
        ))}
      </div>
    </div>
  );
}
