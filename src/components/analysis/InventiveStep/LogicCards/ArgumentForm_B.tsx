"use client";

import { useState } from "react";
import ArgumentFormHeader from "./Header";
import { ArgumentTextArea } from "./ArgumentTextArea";

interface ArgumentFormBProps {
  initialBackgroundLimit: string;
  initialTeachingAway: string;
  recommended: boolean;
  onSave: (content: { background_limit: string; teaching_away: string }) => Promise<void>;
}

export default function ArgumentFormB({
  initialBackgroundLimit,
  initialTeachingAway,
  recommended,
  onSave,
}: ArgumentFormBProps) {
  const [isEditing, setIsEditing] = useState(false);
  const [isSaving, setIsSaving] = useState(false);
  const [saveError, setSaveError] = useState<string | null>(null);
  const [backgroundLimitation, setBackgroundLimitation] = useState(
    recommended ? initialBackgroundLimit : ""
  );
  const [teachingAway, setTeachingAway] = useState(recommended ? initialTeachingAway : "");

  const handleToggleEdit = async () => {
    if (!isEditing) {
      setSaveError(null);
      setIsEditing(true);
      return;
    }

    setIsSaving(true);
    setSaveError(null);

    try {
      await onSave({
        background_limit: backgroundLimitation,
        teaching_away: teachingAway,
      });
      setIsEditing(false);
    } catch (error) {
      setSaveError(error instanceof Error ? error.message : "수정 내용을 저장하지 못했습니다.");
    } finally {
      setIsSaving(false);
    }
  };

  return (
    <div className="w-full pt-7 px-9 pb-9 flex flex-col gap-6 bg-bg-surface border border-outline-sub rounded-lg">
      <ArgumentFormHeader
        title="복수인용발명결합"
        subtitle="Teaching Away 논리"
        description="내 발명에서 수치(파라미터)가 법적 권리를 확보할 수 있는지를 검토해요"
        isEditing={isEditing}
        isSaving={isSaving}
        onToggleEdit={handleToggleEdit}
      />

      <div className="flex flex-col gap-10">
        <ArgumentTextArea
          label="배경기술의 한계"
          value={backgroundLimitation}
          onChange={setBackgroundLimitation}
          placeholder={initialBackgroundLimit}
          isEditing={isEditing}
        />

        <ArgumentTextArea
          label="결합 동기의 부재 (Teaching Away)"
          value={teachingAway}
          onChange={setTeachingAway}
          placeholder={initialTeachingAway}
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
