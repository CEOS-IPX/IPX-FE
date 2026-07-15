"use client";

import { useState } from "react";
import ArgumentFormHeader from "./Header";
import { ArgumentTextArea } from "./ArgumentTextArea";

// 추후 api 연동 시 교체 (AI 추천이 아닌 항목은 api가 이 안내 문구를 내려줌)
const MOCK_PLACEHOLDER_CONTENT = "직접 입력해주세요";

export default function ArgumentFormC() {
  const [isEditing, setIsEditing] = useState(false);
  const [rejectionReason, setRejectionReason] = useState(MOCK_PLACEHOLDER_CONTENT);
  const [counterArgument, setCounterArgument] = useState(MOCK_PLACEHOLDER_CONTENT);

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
          placeholder="EX) 구성요소 B(표면개질 나노 충진제)를 단순 주지관용기술로 봄."
          isEditing={isEditing}
        />

        <ArgumentTextArea
          label="주지관용기술이 아님을 입증하는 반박 논리"
          value={counterArgument}
          onChange={setCounterArgument}
          placeholder="해당 구성이 관용적으로 채택되는 것이 아님을 입증하는 반박 논리를 작성합니다."
          isEditing={isEditing}
        />
      </div>
    </div>
  );
}
