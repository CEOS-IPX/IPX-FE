"use client";

import { useState } from "react";
import ArgumentFormHeader from "./Header";
import { DropDown, type DropDownOption } from "./DropDown";
import { TextArea } from "@/components/ui/TextArea";

// 추후 api 연동 시 교체 (구성요소 분석 단계에서 만든 구성요소 목록)
const MOCK_ELEMENTS: DropDownOption[] = [
  { id: crypto.randomUUID(), label: "생분해성 베이스 수지" },
  { id: crypto.randomUUID(), label: "표면개질 나노 충전제" },
  { id: crypto.randomUUID(), label: "무용제 수계 분산 공정" },
  { id: crypto.randomUUID(), label: "UV 경화 가교" },
];

export default function ArgumentFormD() {
  const [changedElementId, setChangedElementId] = useState<string | null>(null);

  return (
    <div className="w-full p-6 flex flex-col gap-5 bg-bg-surface border border-outline-sub rounded-lg">
      <ArgumentFormHeader title="단순설계변경" subtitle="비-자명성 논리" />

      <div className="flex flex-col gap-5">
        <DropDown
          label="변경된 구성요소"
          options={MOCK_ELEMENTS}
          value={changedElementId}
          onChange={setChangedElementId}
          placeholder="구성요소를 선택해주세요"
          className="w-1/2"
        />

        <TextArea
          labelSize={15}
          label="단순 설계 변경이 아님을 입증하는 논리"
          placeholder="변경된 구성요소가 통상의 기술자가 쉽게 도출할 수 있는 단순 설계 변경이 아니라는 논리를 작성합니다."
          rows={2}
          className="h-18"
        />
      </div>
    </div>
  );
}
