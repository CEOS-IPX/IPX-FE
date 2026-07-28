"use client";

import { use, useEffect, useState } from "react";
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
import { CreateReportForm } from "@/components/report/CreateReportForm";
import { getInventiveStepAnalysis, updateInventiveArgument } from "@/lib/api/analysis";
import { ApiError } from "@/lib/api/error";
import { useAuthStore } from "@/store/authStore";
import type {
  InventiveStepAnalysisResponse,
  InventiveStepArgument,
  InventiveStepArgumentContent,
  UpdateInventiveArgumentRequest,
} from "@/types/inventiveStep.type";

const ARGUMENT_TYPE_TO_LOGIC_KEY: Record<
  InventiveStepArgument["argumentType"],
  InventiveStepLogicKey
> = {
  NUMERICAL_LIMIT: "numericLimitation",
  COMBINATION_MOTIVATION: "multiReferenceCombination",
  COMMON_TECHNIQUE: "commonKnowledge",
  SIMPLE_DESIGN: "simpleDesignChange",
};

const LOGIC_KEY_TO_ARGUMENT_TYPE: Record<
  InventiveStepLogicKey,
  InventiveStepArgument["argumentType"]
> = {
  numericLimitation: "NUMERICAL_LIMIT",
  multiReferenceCombination: "COMBINATION_MOTIVATION",
  commonKnowledge: "COMMON_TECHNIQUE",
  simpleDesignChange: "SIMPLE_DESIGN",
};

const INVENTIVE_STEP_ERROR_MESSAGES: Record<string, string> = {
  SC001: "로그인이 필요합니다.",
  CA002: "해당 사건에 접근할 권한이 없습니다.",
  CA001: "사건을 찾을 수 없습니다.",
  I003: "진보성 분석 결과가 존재하지 않습니다.",
  I004: "수정할 진보성 논리 항목을 찾을 수 없습니다.",
  C001: "수정할 내용을 확인해주세요.",
  C002: "서버 내부 오류가 발생했습니다. 잠시 후 다시 시도해주세요.",
};

function getArgument(analysis: InventiveStepAnalysisResponse, logicKey: InventiveStepLogicKey) {
  const argumentType = LOGIC_KEY_TO_ARGUMENT_TYPE[logicKey];
  return analysis.arguments.find((argument) => argument.argumentType === argumentType);
}

function renderArgumentForm(
  analysis: InventiveStepAnalysisResponse,
  logicKey: InventiveStepLogicKey,
  contentIsPlaceholder: boolean,
  onSave: (argumentId: number, content: InventiveStepArgumentContent) => Promise<void>
) {
  const argument = getArgument(analysis, logicKey);
  if (!argument) return null;

  switch (argument.argumentType) {
    case "NUMERICAL_LIMIT":
      return (
        <ArgumentFormA
          recommended={!contentIsPlaceholder}
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
          recommended={!contentIsPlaceholder}
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
          recommended={!contentIsPlaceholder}
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
          recommended={!contentIsPlaceholder}
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
  const isAuthInitialized = useAuthStore((state) => state.isInitialized);
  const accessToken = useAuthStore((state) => state.accessToken);
  const [result, setResult] = useState<{
    caseId: string;
    analysis: InventiveStepAnalysisResponse;
  } | null>(null);
  const [requestError, setRequestError] = useState<{
    caseId: string;
    message: string;
  } | null>(null);
  const [reloadCount, setReloadCount] = useState(0);
  const [selectedLogics, setSelectedLogics] = useState<Set<InventiveStepLogicKey>>(new Set());
  // AI가 최초 분석 시 추천한 논리 카테고리(argumentId) 고정 스냅샷 -> 이후 사용자가 선택/해제해도 "AI 추천" 배지는 바뀌면 안 됨
  const [aiRecommendedArgumentIds, setAiRecommendedArgumentIds] = useState<Set<number>>(new Set());
  const [placeholderArgumentIds, setPlaceholderArgumentIds] = useState<Set<number>>(new Set());
  const [updatingLogics, setUpdatingLogics] = useState<Set<InventiveStepLogicKey>>(new Set());
  const [updateError, setUpdateError] = useState<string | null>(null);

  useEffect(() => {
    if (!isAuthInitialized || !accessToken) return;

    let canceled = false;

    getInventiveStepAnalysis(id)
      .then((data) => {
        if (canceled) return;

        setRequestError(null);
        setResult({ caseId: id, analysis: data });
        setSelectedLogics(
          new Set(
            data.arguments
              .filter((argument) => argument.recommended)
              .map((argument) => ARGUMENT_TYPE_TO_LOGIC_KEY[argument.argumentType])
          )
        );
        setAiRecommendedArgumentIds(
          new Set(
            data.arguments.filter((argument) => argument.recommended).map((a) => a.argumentId)
          )
        );
        setPlaceholderArgumentIds(
          new Set(
            data.arguments
              .filter((argument) => !argument.recommended)
              .map((argument) => argument.argumentId)
          )
        );
      })
      .catch((error) => {
        if (canceled) return;

        setResult(null);
        setRequestError({
          caseId: id,
          message:
            error instanceof ApiError
              ? (INVENTIVE_STEP_ERROR_MESSAGES[error.errorCode] ?? error.message)
              : "진보성 분석 결과를 불러오는 중 네트워크 오류가 발생했습니다.",
        });
      });

    return () => {
      canceled = true;
    };
  }, [accessToken, id, isAuthInitialized, reloadCount]);

  const analysis = result?.caseId === id ? result.analysis : null;
  const errorMessage =
    !isAuthInitialized || accessToken
      ? requestError?.caseId === id
        ? requestError.message
        : null
      : INVENTIVE_STEP_ERROR_MESSAGES.SC001;

  const applyArgumentUpdate = (
    updatedArgument: InventiveStepArgument,
    body: UpdateInventiveArgumentRequest
  ) => {
    setResult((previous) => {
      if (!previous || previous.caseId !== id) return previous;

      return {
        ...previous,
        analysis: {
          ...previous.analysis,
          arguments: previous.analysis.arguments.map((argument) =>
            argument.argumentId === updatedArgument.argumentId
              ? {
                  ...argument,
                  recommended: updatedArgument.recommended,
                  ...(body.content ? { content: body.content } : {}),
                }
              : argument
          ) as InventiveStepArgument[],
        },
      };
    });
  };

  const saveArgument = async (argumentId: number, body: UpdateInventiveArgumentRequest) => {
    try {
      const updatedArgument = await updateInventiveArgument(argumentId, body);
      applyArgumentUpdate(updatedArgument, body);
    } catch (error) {
      const message =
        error instanceof ApiError
          ? (INVENTIVE_STEP_ERROR_MESSAGES[error.errorCode] ?? error.message)
          : "진보성 논리 수정 중 네트워크 오류가 발생했습니다.";
      throw new Error(message);
    }
  };

  const saveArgumentContent = async (argumentId: number, content: InventiveStepArgumentContent) => {
    await saveArgument(argumentId, { content });
    setPlaceholderArgumentIds((previous) => {
      const next = new Set(previous);
      next.delete(argumentId);
      return next;
    });
  };

  const toggleLogic = async (key: InventiveStepLogicKey) => {
    if (!analysis || updatingLogics.has(key)) return;

    const argument = getArgument(analysis, key);
    if (!argument) return;

    const nextRecommended = !selectedLogics.has(key);

    setUpdatingLogics((previous) => new Set(previous).add(key));
    setUpdateError(null);

    try {
      await saveArgument(argument.argumentId, { recommended: nextRecommended });
      setSelectedLogics((previous) => {
        const next = new Set(previous);
        if (nextRecommended) {
          next.add(key);
        } else {
          next.delete(key);
        }
        return next;
      });
    } catch (error) {
      setUpdateError(error instanceof Error ? error.message : "선택 상태를 저장하지 못했습니다.");
    } finally {
      setUpdatingLogics((previous) => {
        const next = new Set(previous);
        next.delete(key);
        return next;
      });
    }
  };

  if (!isAuthInitialized || (accessToken && !analysis && !errorMessage)) {
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
        <Button
          variant="secondary"
          size="sm"
          onClick={() => {
            setResult(null);
            setRequestError(null);
            setSelectedLogics(new Set());
            setPlaceholderArgumentIds(new Set());
            setReloadCount((count) => count + 1);
          }}
        >
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
              disabled={updatingLogics.has(logic.key)}
              onClick={() => toggleLogic(logic.key)}
            />
          ))}
        </div>

        {updateError && (
          <p role="alert" className="text-body-13 text-error-default">
            {updateError}
          </p>
        )}

        <div className="mt-3 flex flex-col gap-3">
          {selectedLogics.size === 0 ? (
            <p className="py-20 text-center text-body-emphasis-17 text-caption-label">
              진보성 논리 유형을 선택하면 입력 섹션이 나타납니다
            </p>
          ) : (
            INVENTIVE_STEP_LOGIC_TYPES.filter((logic) => selectedLogics.has(logic.key)).map(
              (logic) => (
                <div key={`${analysis.analysisId}-${logic.key}`}>
                  {renderArgumentForm(
                    analysis,
                    logic.key,
                    placeholderArgumentIds.has(
                      getArgument(analysis, logic.key)?.argumentId ?? Number.NaN
                    ),
                    saveArgumentContent
                  )}
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
