"use client";

import { useState } from "react";
import ArgumentFormHeader from "./Header";
import { ArgumentTextArea } from "./ArgumentTextArea";

interface ArgumentFormDProps {
  initialChangedComponent: string;
  initialNonObviousness: string;
  recommended: boolean;
  onSave: (content: {
    changed_component_label: string;
    changed_component_name: string;
    non_obviousness: string;
  }) => Promise<void>;
}

export default function ArgumentFormD({
  initialChangedComponent,
  initialNonObviousness,
  recommended,
  onSave,
}: ArgumentFormDProps) {
  const [isEditing, setIsEditing] = useState(false);
  const [isSaving, setIsSaving] = useState(false);
  const [saveError, setSaveError] = useState<string | null>(null);
  const [changedComponent, setChangedComponent] = useState(
    recommended ? initialChangedComponent : ""
  );
  const [counterArgument, setCounterArgument] = useState(recommended ? initialNonObviousness : "");

  const handleToggleEdit = async () => {
    if (!isEditing) {
      setSaveError(null);
      setIsEditing(true);
      return;
    }

    const [componentLabel, ...componentNameParts] = changedComponent.split(". ");

    setIsSaving(true);
    setSaveError(null);

    try {
      await onSave({
        changed_component_label: componentNameParts.length > 0 ? componentLabel.trim() : "",
        changed_component_name:
          componentNameParts.length > 0
            ? componentNameParts.join(". ").trim()
            : changedComponent.trim(),
        non_obviousness: counterArgument,
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
        title="단순설계변경"
        subtitle="비-자명성 논리"
        isEditing={isEditing}
        isSaving={isSaving}
        onToggleEdit={handleToggleEdit}
      />

      <div className="flex flex-col gap-10">
        <ArgumentTextArea
          label="변경된 구성요소"
          value={changedComponent}
          onChange={setChangedComponent}
          placeholder={initialChangedComponent || "변경 대상 구성요소를 입력해주세요."}
          isEditing={isEditing}
          className="w-1/2 h-15"
        />

        <ArgumentTextArea
          label="단순 설계 변경이 아님을 입증하는 논리"
          value={counterArgument}
          onChange={setCounterArgument}
          placeholder={initialNonObviousness}
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
