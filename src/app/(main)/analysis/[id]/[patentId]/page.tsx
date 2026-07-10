"use client";

import { useState } from "react";
import ComparisionPatentBox from "@/components/analysis/InventiveStep/Comparision/ComparisionPatentBox";
import { InventiveStepCard } from "@/components/analysis/InventiveStep/InventiveLogics/InventiveStepCard";
import {
  INVENTIVE_STEP_LOGIC_TYPES,
  type InventiveStepLogicKey,
} from "@/constants/analysis/inventiveStep";

// 추후 api 연동 시 교체
const MOCK_PRIMARY_REFERENCE = {
  patentNumber: "KR 10-2023-0145XXX",
  title: "저온 황산침출 기반 니켈·코발트 동시 회수 공정",
  organization: "한국지질자원연구원",
  year: 2024,
};

const MOCK_SECONDARY_REFERENCE = {
  patentNumber: "KR 10-2023-0145XXX",
  title: "저온 황산침출 기반 니켈·코발트 동시 회수 공정KR 10-2023-0145XXX 저온 황산침출 기...",
  organization: "한국지질자원연구원",
  year: 2024,
};

// 추후 api 연동 시 교체
const MOCK_INVENTIVE_STEP_DATA: Record<
  InventiveStepLogicKey,
  { aiRecommended: boolean; tooltipText: string }
> = {
  numericLimitation: {
    aiRecommended: true,
    tooltipText: "정량 데이터 확보로 효과의 현저성 주장",
  },
  multiReferenceCombination: {
    aiRecommended: true,
    tooltipText: "D1·D2 결합 거절 예상으로 Teaching Away 논증 필요",
  },
  commonKnowledge: {
    aiRecommended: false,
    tooltipText: "심사관의 주지관용기술 주장 징후가 없음",
  },
  simpleDesignChange: {
    aiRecommended: false,
    tooltipText: "구성요소 변경이 단순 설계변경 범주에 해당하지 않음",
  },
};

export default function AnalysisReportPage({
  params,
}: {
  params: Promise<{ id: string; patentId: string }>;
}) {
  const [selectedLogics, setSelectedLogics] = useState<Set<InventiveStepLogicKey>>(new Set());

  const toggleLogic = (key: InventiveStepLogicKey) => {
    setSelectedLogics((prev) => {
      const next = new Set(prev);
      if (next.has(key)) {
        next.delete(key);
      } else {
        next.add(key);
      }
      return next;
    });
  };

  return (
    <div className="flex flex-col gap-9">
      <div className="flex flex-col gap-3">
        <h1 className="text-body-emphasis-19 text-body-primary">비교 기술</h1>

        <ComparisionPatentBox
          primaryReference={MOCK_PRIMARY_REFERENCE}
          secondaryReference={MOCK_SECONDARY_REFERENCE}
        />
      </div>

      <div className="flex flex-col gap-3">
        <h1 className="text-body-emphasis-19 text-body-primary">진보성 논리</h1>

        <div className="flex flex-col gap-2 sm:flex-row">
          {INVENTIVE_STEP_LOGIC_TYPES.map((logic) => (
            <InventiveStepCard
              key={logic.key}
              title={logic.title}
              description={logic.description}
              aiRecommended={MOCK_INVENTIVE_STEP_DATA[logic.key].aiRecommended}
              selected={selectedLogics.has(logic.key)}
              onClick={() => toggleLogic(logic.key)}
              tooltipText={MOCK_INVENTIVE_STEP_DATA[logic.key].tooltipText}
            />
          ))}
        </div>

        <div className="mt-3"></div>
      </div>
    </div>
  );
}
