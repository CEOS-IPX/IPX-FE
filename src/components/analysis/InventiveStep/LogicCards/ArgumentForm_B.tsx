"use client";

import { useState } from "react";
import ArgumentFormHeader from "./Header";
import { ArgumentTextArea } from "./ArgumentTextArea";

interface ArgumentFormBProps {
  initialBackgroundLimit: string;
  initialTeachingAway: string;
  recommended: boolean;
}

export default function ArgumentFormB({
  initialBackgroundLimit,
  initialTeachingAway,
  recommended,
}: ArgumentFormBProps) {
  const [isEditing, setIsEditing] = useState(false);
  const [backgroundLimitation, setBackgroundLimitation] = useState(
    recommended ? initialBackgroundLimit : ""
  );
  const [teachingAway, setTeachingAway] = useState(recommended ? initialTeachingAway : "");

  return (
    <div className="w-full pt-7 px-9 pb-9 flex flex-col gap-6 bg-bg-surface border border-outline-sub rounded-lg">
      <ArgumentFormHeader
        title="복수인용발명결합"
        subtitle="Teaching Away 논리"
        description="내 발명에서 수치(파라미터)가 법적 권리를 확보할 수 있는지를 검토해요"
        isEditing={isEditing}
        onToggleEdit={() => setIsEditing((prev) => !prev)}
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
    </div>
  );
}
