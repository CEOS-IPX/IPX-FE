"use client";

import { useState } from "react";
import ArgumentFormHeader from "./Header";
import { ArgumentTextArea } from "./ArgumentTextArea";

interface ArgumentFormCProps {
  initialTarget: string;
  initialRebuttal: string;
  recommended: boolean;
  onSave: (content: {
    target_label: string;
    target_name: string;
    rebuttal: string;
  }) => Promise<void>;
}

export default function ArgumentFormC({
  initialTarget,
  initialRebuttal,
  recommended,
  onSave,
}: ArgumentFormCProps) {
  const [isEditing, setIsEditing] = useState(false);
  const [isSaving, setIsSaving] = useState(false);
  const [saveError, setSaveError] = useState<string | null>(null);
  const [rejectionReason, setRejectionReason] = useState(recommended ? initialTarget : "");
  const [counterArgument, setCounterArgument] = useState(recommended ? initialRebuttal : "");

  const handleToggleEdit = async () => {
    if (!isEditing) {
      setSaveError(null);
      setIsEditing(true);
      return;
    }

    const [targetLabel, ...targetNameParts] = rejectionReason.split(". ");

    setIsSaving(true);
    setSaveError(null);

    try {
      await onSave({
        target_label: targetNameParts.length > 0 ? targetLabel.trim() : "",
        target_name:
          targetNameParts.length > 0 ? targetNameParts.join(". ").trim() : rejectionReason.trim(),
        rebuttal: counterArgument,
      });
      setIsEditing(false);
    } catch (error) {
      setSaveError(error instanceof Error ? error.message : "수정 내용을 저장하지 못했습니다.");
    } finally {
      setIsSaving(false);
    }
  };

  return (
    <div className="w-full p-6 flex flex-col gap-5 bg-bg-surface border border-outline-sub rounded-lg">
      <ArgumentFormHeader
        title="주지관용기술"
        subtitle="주지관용기술 반박 논리"
        isEditing={isEditing}
        isSaving={isSaving}
        onToggleEdit={handleToggleEdit}
      />

      <div className="flex flex-col gap-10">
        <ArgumentTextArea
          label="거절 또는 예상 거절 사유 (주지관용기술 주장 대상)"
          value={rejectionReason}
          onChange={setRejectionReason}
          placeholder={initialTarget || "반박 대상 구성요소를 입력해주세요."}
          isEditing={isEditing}
        />

        <ArgumentTextArea
          label="주지관용기술이 아님을 입증하는 반박 논리"
          value={counterArgument}
          onChange={setCounterArgument}
          placeholder={initialRebuttal}
          isEditing={isEditing}
        />
      </div>

      {saveError && (
        <p role="alert" className="text-body-13 text-error-default">
          {saveError}
        </p>
      )}
    </div>
  );
}
