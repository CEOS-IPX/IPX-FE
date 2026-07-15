"use client";

import { useState } from "react";
import ComparisionPatentBox from "@/components/analysis/InventiveStep/Comparision/ComparisionPatentBox";
import { InventiveStepCard } from "@/components/analysis/InventiveStep/InventiveLogics/InventiveStepCard";
import ArgumentFormA from "@/components/analysis/InventiveStep/LogicCards/ArgumentForm_A";
import ArgumentFormB from "@/components/analysis/InventiveStep/LogicCards/ArgumentForm_B";
import ArgumentFormC from "@/components/analysis/InventiveStep/LogicCards/ArgumentForm_C";
import ArgumentFormD from "@/components/analysis/InventiveStep/LogicCards/ArgumentForm_D";
import {
  INVENTIVE_STEP_LOGIC_TYPES,
  type InventiveStepLogicKey,
} from "@/constants/analysis/inventiveStep";
import { Button } from "@/components/ui/Button";

const ARGUMENT_FORM_BY_LOGIC: Record<InventiveStepLogicKey, React.ComponentType> = {
  numericLimitation: ArgumentFormA,
  multiReferenceCombination: ArgumentFormB,
  commonKnowledge: ArgumentFormC,
  simpleDesignChange: ArgumentFormD,
};

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
const MOCK_INVENTIVE_STEP_DATA: Record<InventiveStepLogicKey, { aiRecommended: boolean }> = {
  numericLimitation: { aiRecommended: true },
  multiReferenceCombination: { aiRecommended: true },
  commonKnowledge: { aiRecommended: false },
  simpleDesignChange: { aiRecommended: false },
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
    <div className="flex flex-col gap-8">
      <h1 className="text-headline-emphasis-28 text-title-primary mb-4"> 기술 진보성 분석하기</h1>

      <div className="flex flex-col gap-6">
        <h1 className="text-title-emphasis-20 text-body-primary">선택한 기술</h1>

        <ComparisionPatentBox
          primaryReference={MOCK_PRIMARY_REFERENCE}
          secondaryReference={MOCK_SECONDARY_REFERENCE}
        />
      </div>

      <div className="flex flex-col gap-6">
        <h1 className="text-title-emphasis-20 text-body-primary">진보성 논리</h1>

        <div className="flex flex-col gap-2 sm:flex-row">
          {INVENTIVE_STEP_LOGIC_TYPES.map((logic) => (
            <InventiveStepCard
              key={logic.key}
              title={logic.title}
              description={logic.description}
              aiRecommended={MOCK_INVENTIVE_STEP_DATA[logic.key].aiRecommended}
              selected={selectedLogics.has(logic.key)}
              onClick={() => toggleLogic(logic.key)}
            />
          ))}
        </div>

        <div className="mt-3 flex flex-col gap-3">
          {selectedLogics.size === 0 ? (
            <p className="py-20 text-center text-body-emphasis-17 text-caption-label">
              진보성 논리 유형을 선택하면 입력 섹션이 나타납니다
            </p>
          ) : (
            INVENTIVE_STEP_LOGIC_TYPES.filter((logic) => selectedLogics.has(logic.key)).map(
              (logic) => {
                const ArgumentForm = ARGUMENT_FORM_BY_LOGIC[logic.key];
                return <ArgumentForm key={logic.key} />;
              }
            )
          )}
        </div>
      </div>

      <Button variant="secondary" className="mt-4">
        저장 후 목록으로
      </Button>
    </div>
  );
}
