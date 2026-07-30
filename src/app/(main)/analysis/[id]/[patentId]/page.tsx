"use client";

import { use } from "react";
import { useRouter } from "next/navigation";
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
import { getArgument, useInventiveStepAnalysis } from "@/hooks/useInventiveStepAnalysis";
import type {
  InventiveStepAnalysisResponse,
  InventiveStepArgumentContent,
} from "@/types/inventiveStep.type";

function renderArgumentForm(
  analysis: InventiveStepAnalysisResponse,
  logicKey: InventiveStepLogicKey,
  onSave: (argumentId: number, content: InventiveStepArgumentContent) => Promise<void>
) {
  const argument = getArgument(analysis, logicKey);
  if (!argument) return null;

  switch (argument.argumentType) {
    case "NUMERICAL_LIMIT":
      return (
        <ArgumentFormA
          onSave={(effectItems) =>
            onSave(argument.argumentId, {
              effect_items: effectItems,
            })
          }
          initialEffects={(argument.content.effect_items ?? []).map((effect) => ({
            category: effect.metric,
            unit: effect.unit,
            priorArt: effect.prior_art_value,
            invention: effect.invention_value,
            improvement: effect.improvement,
          }))}
        />
      );
    case "COMBINATION_MOTIVATION":
      return (
        <ArgumentFormB
          initialBackgroundLimit={argument.content.background_limit ?? ""}
          initialTeachingAway={argument.content.teaching_away ?? ""}
          onSave={(content) => onSave(argument.argumentId, content)}
        />
      );
    case "COMMON_TECHNIQUE": {
      const target = [argument.content.target_label ?? "", argument.content.target_name ?? ""]
        .filter(Boolean)
        .join(". ");

      return (
        <ArgumentFormC
          initialTarget={target}
          initialRebuttal={argument.content.rebuttal ?? ""}
          onSave={(content) => onSave(argument.argumentId, content)}
        />
      );
    }
    case "SIMPLE_DESIGN": {
      const changedComponent = [
        argument.content.changed_component_label ?? "",
        argument.content.changed_component_name ?? "",
      ]
        .filter(Boolean)
        .join(". ");

      return (
        <ArgumentFormD
          initialChangedComponent={changedComponent}
          initialNonObviousness={argument.content.non_obviousness ?? ""}
          onSave={(content) => onSave(argument.argumentId, content)}
        />
      );
    }
  }
}

export default function AnalysisReportPage({
  params,
}: {
  params: Promise<{ id: string; patentId: string }>;
}) {
  const { id } = use(params);
  const router = useRouter();
  const {
    analysis,
    errorMessage,
    isLoading,
    selectedLogics,
    aiRecommendedArgumentIds,
    toggleLogic,
    saveArgumentContent,
    reload,
  } = useInventiveStepAnalysis(id);

  if (isLoading) {
    return (
      <div className="flex min-h-80 items-center justify-center">
        <p className="text-body-15 text-caption-label">진보성 분석 결과를 불러오고 있습니다...</p>
      </div>
    );
  }

  if (errorMessage || !analysis) {
    return (
      <div className="flex min-h-80 flex-col items-center justify-center gap-4">
        <p role="alert" className="text-body-17 text-body-secondary">
          {errorMessage ?? "진보성 분석 결과를 불러오지 못했습니다."}
        </p>
        <Button variant="secondary" size="sm" onClick={reload}>
          다시 조회
        </Button>
      </div>
    );
  }

  const primaryReference = {
    patentNumber: analysis.primaryArt.applicationNumber,
    title: analysis.primaryArt.title,
    organization: analysis.primaryArt.applicantName,
    year: analysis.primaryArt.applicationDate.slice(0, 4),
  };
  const secondaryReference = analysis.secondaryArt
    ? {
        patentNumber: analysis.secondaryArt.applicationNumber,
        title: analysis.secondaryArt.title,
        organization: analysis.secondaryArt.applicantName,
        year: analysis.secondaryArt.applicationDate.slice(0, 4),
      }
    : null;

  return (
    <div className="flex flex-col gap-8">
      <h1 className="mb-4 text-headline-emphasis-28 text-title-primary">기술 진보성 분석하기</h1>

      <div className="flex flex-col gap-6">
        <h2 className="text-title-emphasis-20 text-body-primary">선택한 기술</h2>
        <ComparisionPatentBox
          primaryReference={primaryReference}
          secondaryReference={secondaryReference}
        />
      </div>

      <div className="flex flex-col gap-6">
        <h2 className="text-title-emphasis-20 text-body-primary">진보성 논리</h2>

        <div className="flex flex-col gap-2 sm:flex-row">
          {INVENTIVE_STEP_LOGIC_TYPES.map((logic) => (
            <InventiveStepCard
              key={logic.key}
              title={logic.title}
              description={logic.description}
              aiRecommended={aiRecommendedArgumentIds.has(
                getArgument(analysis, logic.key)?.argumentId ?? Number.NaN
              )}
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
              (logic) => (
                <div key={`${analysis.analysisId}-${logic.key}`}>
                  {renderArgumentForm(analysis, logic.key, saveArgumentContent)}
                </div>
              )
            )
          )}
        </div>
      </div>

      <Button variant="secondary" className="mt-4" onClick={() => router.push("/analysis")}>
        목록으로
      </Button>
    </div>
  );
}
