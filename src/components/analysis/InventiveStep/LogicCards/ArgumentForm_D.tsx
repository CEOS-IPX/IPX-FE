"use client";

import { useState } from "react";
import ArgumentFormHeader from "./Header";
import { ArgumentTextArea } from "./ArgumentTextArea";

interface ArgumentFormDProps {
  initialChangedComponent: string;
  initialNonObviousness: string;
  recommended: boolean;
}

export default function ArgumentFormD({
  initialChangedComponent,
  initialNonObviousness,
  recommended,
}: ArgumentFormDProps) {
  const [isEditing, setIsEditing] = useState(false);
  const [changedComponent, setChangedComponent] = useState(
    recommended ? initialChangedComponent : ""
  );
  const [counterArgument, setCounterArgument] = useState(recommended ? initialNonObviousness : "");

  return (
    <div className="w-full p-6 flex flex-col gap-5 bg-bg-surface border border-outline-sub rounded-lg">
      <ArgumentFormHeader
        title="단순설계변경"
        subtitle="비-자명성 논리"
        isEditing={isEditing}
        onToggleEdit={() => setIsEditing((prev) => !prev)}
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
    </div>
  );
}
