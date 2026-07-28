"use client";

import { useState } from "react";
import { Button } from "@/components/ui/Button";
import EditIcon from "@/components/icons/icon-edit.svg";
import { MatchStatusChip, type MatchStatus } from "./MatchStatusChip";
import type {
  NoveltyComparison,
  NoveltyComparisonResult,
  UpdateNoveltyComparisonRequest,
} from "@/types/novelty.type";

const MATCH_STATUS_BY_RESULT: Record<NoveltyComparisonResult, MatchStatus> = {
  IDENTICAL: "identical",
  SIMILAR: "similar",
  NOVEL: "novel",
};

const COMPARISON_RESULT_OPTIONS: Array<{
  value: NoveltyComparisonResult;
  label: string;
}> = [
  { value: "IDENTICAL", label: "동일" },
  { value: "SIMILAR", label: "유사" },
  { value: "NOVEL", label: "신규" },
];

interface NoveltyRowProps {
  comparison: NoveltyComparison;
  onSave: (comparisonId: number, body: UpdateNoveltyComparisonRequest) => Promise<void>;
}

export function NoveltyRow({ comparison, onSave }: NoveltyRowProps) {
  const [isEditing, setIsEditing] = useState(false);
  const [isSaving, setIsSaving] = useState(false);
  const [comparisonResult, setComparisonResult] = useState(comparison.comparisonResult);
  const [citation, setCitation] = useState(comparison.citation ?? "");
  const [saveError, setSaveError] = useState<string | null>(null);

  const handleCancel = () => {
    setComparisonResult(comparison.comparisonResult);
    setCitation(comparison.citation ?? "");
    setSaveError(null);
    setIsEditing(false);
  };

  const handleSave = async () => {
    setIsSaving(true);
    setSaveError(null);

    try {
      await onSave(comparison.comparisonId, {
        comparisonResult,
        citation: citation.trim() || null,
      });
      setCitation(citation.trim());
      setIsEditing(false);
    } catch (error) {
      setSaveError(error instanceof Error ? error.message : "수정 내용을 저장하지 못했습니다.");
    } finally {
      setIsSaving(false);
    }
  };

  return (
    <div className="grid grid-cols-[1fr_2fr_160px] items-center gap-4 px-4 py-5">
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
            value={citation}
            onChange={(event) => setCitation(event.target.value)}
            placeholder="선행문헌 원문 인용 부분을 입력해주세요."
            className="min-h-20 w-full resize-y rounded-md border border-outline-default bg-bg-surface p-3 text-body-13 text-body-primary outline-none focus:border-stroke-primary"
          />
        ) : (
          comparison.citation && (
            <p className="text-body-13 text-body-disabled">{comparison.citation}</p>
          )
        )}
        {saveError && (
          <p role="alert" className="text-body-13 text-error-default">
            {saveError}
          </p>
        )}
      </div>

      <div className="flex flex-col items-end gap-2">
        {isEditing ? (
          <>
            <select
              value={comparisonResult}
              disabled={isSaving}
              onChange={(event) =>
                setComparisonResult(event.target.value as NoveltyComparisonResult)
              }
              className="h-9 w-full rounded-md border border-outline-default bg-bg-surface px-2 text-label-13 text-body-primary outline-none focus:border-stroke-primary"
            >
              {COMPARISON_RESULT_OPTIONS.map((option) => (
                <option key={option.value} value={option.value}>
                  {option.label}
                </option>
              ))}
            </select>
            <div className="flex w-full gap-1.5">
              <Button
                variant="secondary"
                size="sm"
                disabled={isSaving}
                className="flex-1 px-2"
                onClick={handleCancel}
              >
                취소
              </Button>
              <Button
                size="sm"
                disabled={isSaving}
                aria-busy={isSaving}
                className="flex-1 px-2"
                onClick={handleSave}
              >
                {isSaving ? "저장 중" : "저장"}
              </Button>
            </div>
          </>
        ) : (
          <>
            <MatchStatusChip matchStatus={MATCH_STATUS_BY_RESULT[comparison.comparisonResult]} />
            <button
              type="button"
              onClick={() => setIsEditing(true)}
              className="flex cursor-pointer items-center gap-1 text-label-13 text-primary-default"
            >
              <EditIcon className="h-4 w-4 text-icon-primary-emphasize [&_path]:fill-current" />
              수정
            </button>
          </>
        )}
      </div>
    </div>
  );
}
