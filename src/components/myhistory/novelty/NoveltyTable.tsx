import type { NoveltyComparison } from "@/types/novelty.type";
import { NoveltyRow } from "./NoveltyRow";

interface NoveltyTableProps {
  comparisons: NoveltyComparison[];
}

export default function NoveltyTable({ comparisons }: NoveltyTableProps) {
  return (
    <div className="w-full overflow-hidden border-y border-outline-sub">
      <div className="grid grid-cols-[1fr_2fr_100px] items-center gap-4 bg-bg-neutral-hover px-4 py-3">
        <span className="text-label-15 text-body-disabled">발명 구성요소</span>
        <span className="text-label-15 text-body-disabled">주인용발명(D1)의 대응 개시 내용</span>
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
