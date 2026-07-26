"use client";

import { useState } from "react";
import ArgumentFormHeader from "./Header";
import { ArgumentTextArea } from "./ArgumentTextArea";

interface ArgumentFormCProps {
  initialTarget: string;
  initialRebuttal: string;
  recommended: boolean;
}

export default function ArgumentFormC({
  initialTarget,
  initialRebuttal,
  recommended,
}: ArgumentFormCProps) {
  const [isEditing, setIsEditing] = useState(false);
  const [rejectionReason, setRejectionReason] = useState(recommended ? initialTarget : "");
  const [counterArgument, setCounterArgument] = useState(recommended ? initialRebuttal : "");

  return (
    <div className="w-full p-6 flex flex-col gap-5 bg-bg-surface border border-outline-sub rounded-lg">
      <ArgumentFormHeader
        title="주지관용기술"
        subtitle="주지관용기술 반박 논리"
        isEditing={isEditing}
        onToggleEdit={() => setIsEditing((prev) => !prev)}
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
    </div>
  );
}
