"use client";

import { useState } from "react";
import ArgumentFormHeader from "./Header";
import { ArgumentTextArea } from "./ArgumentTextArea";

// 추후 api 연동 시 교체 (AI가 미리 작성해준 내용)
const MOCK_BACKGROUND_LIMITATION =
  "종래기술은 저온(50-60℃) 조건에서 니켈·코발트를 동시 회수하는 구성을 개시하지 않고 있으며, 고온 침출 공정에 의존하여 에너지 효율이 낮다는 한계가 있다.";
const MOCK_TEACHING_AWAY =
  "D1은 고온 침출을 전제로 한 공정만을 개시하고 있어, 통상의 기술자가 저온 조건으로 전환할 동기가 없다. 오히려 저온 조건에서는 회수율이 낮아질 것으로 예상되어 D1의 개선 방향과 반대된다.";

export default function ArgumentFormB() {
  const [isEditing, setIsEditing] = useState(false);
  const [backgroundLimitation, setBackgroundLimitation] = useState(MOCK_BACKGROUND_LIMITATION);
  const [teachingAway, setTeachingAway] = useState(MOCK_TEACHING_AWAY);

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
          placeholder="종래기술의 한계를 발명의 해결 방향과 반대로 정리합니다."
          isEditing={isEditing}
        />

        <ArgumentTextArea
          label="결합 동기의 부재 (Teaching Away)"
          value={teachingAway}
          onChange={setTeachingAway}
          placeholder="D1과 D2가 서로 반대 방향으로 가르쳐 결합 동기가 없음을 논증합니다."
          isEditing={isEditing}
        />
      </div>
    </div>
  );
}
