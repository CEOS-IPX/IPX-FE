"use client";

import { ComparisonResultDropdown } from "./ComparisonResultDropdown";
import { MatchStatusChip, type MatchStatus } from "./MatchStatusChip";
import type { NoveltyComparison, NoveltyComparisonResult } from "@/types/novelty.type";

const MATCH_STATUS_BY_RESULT: Record<NoveltyComparisonResult, MatchStatus> = {
  IDENTICAL: "identical",
  SIMILAR: "similar",
  NOVEL: "novel",
};

interface NoveltyRowProps {
  comparison: NoveltyComparison;
  isEditing: boolean;
  disabled?: boolean;
  draftResult: NoveltyComparisonResult;
  draftCitation: string;
  onResultChange: (value: NoveltyComparisonResult) => void;
  onCitationChange: (value: string) => void;
}

// 일괄 수정 모드(NoveltyTable에서 관리)로 바뀌면서 이 행은 편집 상태를 직접 갖지 않고, 상위에서 받은 draft 값을 그대로 보여주기만 함
export function NoveltyRow({
  comparison,
  isEditing,
  disabled,
  draftResult,
  draftCitation,
  onResultChange,
  onCitationChange,
}: NoveltyRowProps) {
  return (
    <div className="grid grid-cols-[0.75fr_1.5fr_100px] items-center gap-8 px-4 py-9">
      <div className="flex items-center gap-3">
        <span className="flex h-9 w-9 shrink-0 items-center justify-center rounded-lg bg-bg-elementlist text-label-emphasis-15 text-primary-sub">
          {comparison.componentLabel}
        </span>

        <p className="text-label-emphasis-17 text-title-secondary">{comparison.componentName}</p>
      </div>

      <div className="flex min-w-0 flex-col gap-2">
        <p className="text-label-15 text-caption-label">{comparison.disclosureText}</p>
        {isEditing ? (
          <textarea
            value={draftCitation}
            onChange={(event) => onCitationChange(event.target.value)}
            placeholder="선행문헌 원문 인용 부분을 입력해주세요."
            disabled={disabled}
            className="min-h-20 w-full resize-none rounded-md border border-outline-default bg-bg-surface p-4 text-body-15 text-caption-label outline-none focus:border-stroke-primary scrollbar-hide"
          />
        ) : (
          comparison.citation && (
            <p className="text-label-15 text-caption-label">{comparison.citation}</p>
          )
        )}
      </div>

      <div className="flex flex-col items-center gap-2">
        {isEditing ? (
          <ComparisonResultDropdown
            value={draftResult}
            disabled={disabled}
            onChange={onResultChange}
          />
        ) : (
          <MatchStatusChip matchStatus={MATCH_STATUS_BY_RESULT[comparison.comparisonResult]} />
        )}
      </div>
    </div>
  );
}
