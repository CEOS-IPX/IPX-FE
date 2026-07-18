"use client";

import { useState } from "react";
import ArgumentFormHeader from "./Header";
import { ArgumentTextArea } from "./ArgumentTextArea";

// 추후 api 연동 시 교체 (AI 추천이 아닌 항목은 api가 이 안내 문구를 내려줌)
const MOCK_PLACEHOLDER_CONTENT = "직접 입력해주세요";

export default function ArgumentFormD() {
  const [isEditing, setIsEditing] = useState(false);
  const [changedComponent, setChangedComponent] = useState(MOCK_PLACEHOLDER_CONTENT);
  const [counterArgument, setCounterArgument] = useState(MOCK_PLACEHOLDER_CONTENT);

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
          placeholder="EX) A. 무용제 수계 분산 공정"
          isEditing={isEditing}
          className="w-1/2 h-15"
        />

        <ArgumentTextArea
          label="단순 설계 변경이 아님을 입증하는 논리"
          value={counterArgument}
          onChange={setCounterArgument}
          placeholder="변경된 구성요소가 통상의 기술자가 쉽게 도출할 수 있는 단순 설계 변경이 아니라는 논리를 작성합니다."
          isEditing={isEditing}
        />
      </div>
    </div>
  );
}
