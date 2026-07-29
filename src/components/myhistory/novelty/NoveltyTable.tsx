"use client";

import { useState } from "react";
import { Button } from "@/components/ui/Button";
import EditIcon from "@/components/icons/icon-edit.svg";
import { NoveltyRow } from "./NoveltyRow";
import type {
  NoveltyComparison,
  NoveltyComparisonResult,
  UpdateNoveltyComparisonRequest,
} from "@/types/novelty.type";

interface NoveltyTableProps {
  comparisons: NoveltyComparison[];
  onSave: (comparisonId: number, body: UpdateNoveltyComparisonRequest) => Promise<void>;
}

type Draft = { comparisonResult: NoveltyComparisonResult; citation: string };

function buildDrafts(comparisons: NoveltyComparison[]): Record<number, Draft> {
  return Object.fromEntries(
    comparisons.map((comparison) => [
      comparison.comparisonId,
      { comparisonResult: comparison.comparisonResult, citation: comparison.citation ?? "" },
    ])
  );
}

export default function NoveltyTable({ comparisons, onSave }: NoveltyTableProps) {
  const [isEditing, setIsEditing] = useState(false);
  const [isSaving, setIsSaving] = useState(false);
  const [drafts, setDrafts] = useState<Record<number, Draft>>({});
  const [saveError, setSaveError] = useState<string | null>(null);

  const handleStartEdit = () => {
    setDrafts(buildDrafts(comparisons));
    setSaveError(null);
    setIsEditing(true);
  };

  const handleCancel = () => {
    setIsEditing(false);
    setSaveError(null);
  };

  const updateDraft = (comparisonId: number, patch: Partial<Draft>) => {
    setDrafts((previous) => ({
      ...previous,
      [comparisonId]: { ...previous[comparisonId], ...patch } as Draft,
    }));
  };

  const handleSaveAll = async () => {
    setIsSaving(true);
    setSaveError(null);

    try {
      await Promise.all(
        comparisons.map((comparison) => {
          const draft = drafts[comparison.comparisonId];
          if (!draft) return Promise.resolve();
          return onSave(comparison.comparisonId, {
            comparisonResult: draft.comparisonResult,
            citation: draft.citation.trim() || null,
          });
        })
      );
      setIsEditing(false);
    } catch (error) {
      setSaveError(error instanceof Error ? error.message : "수정 내용을 저장하지 못했습니다.");
    } finally {
      setIsSaving(false);
    }
  };

  return (
    <div className="flex w-full flex-col gap-3">
      <div className="flex justify-end">
        {isEditing ? (
          <div className="flex gap-1.5">
            <Button variant="secondary" size="sm" disabled={isSaving} onClick={handleCancel}>
              취소하기
            </Button>
            <Button size="sm" disabled={isSaving} aria-busy={isSaving} onClick={handleSaveAll}>
              {isSaving ? "저장 중" : "저장하기"}
            </Button>
          </div>
        ) : (
          <Button variant="primary" size="sm" className="gap-1" onClick={handleStartEdit}>
            <EditIcon className="h-4 w-4 shrink-0 [&_path]:fill-current" aria-hidden />
            수정하기
          </Button>
        )}
      </div>

      {saveError && (
        <p role="alert" className="text-label-13 text-error-default">
          {saveError}
        </p>
      )}

      <div className="w-full overflow-hidden border-y border-outline-sub">
        <div className="grid grid-cols-[0.75fr_1.5fr_100px] items-center gap-8 bg-bg-neutral-hover px-4 py-3">
          <span className="text-label-15 text-body-disabled">발명 구성요소</span>
          <span className="text-label-15 text-body-disabled">주인용발명의 대응 개시 내용</span>
          <span className="text-center text-label-15 text-body-disabled">대비 결과</span>
        </div>

        <div>
          {comparisons.map((comparison) => {
            const draft = drafts[comparison.comparisonId];

            return (
              <NoveltyRow
                key={comparison.comparisonId}
                comparison={comparison}
                isEditing={isEditing}
                disabled={isSaving}
                draftResult={draft?.comparisonResult ?? comparison.comparisonResult}
                draftCitation={draft?.citation ?? comparison.citation ?? ""}
                onResultChange={(value) =>
                  updateDraft(comparison.comparisonId, { comparisonResult: value })
                }
                onCitationChange={(value) =>
                  updateDraft(comparison.comparisonId, { citation: value })
                }
              />
            );
          })}
        </div>
      </div>
    </div>
  );
}
