"use client";

import { useEffect, useState } from "react";
import { getInventiveStepAnalysis, updateInventiveArgument } from "@/lib/api/analysis";
import { ApiError } from "@/lib/api/error";
import { useAuthStore } from "@/store/authStore";
import type { InventiveStepLogicKey } from "@/constants/analysis/inventiveStep";
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

export function getArgument(
  analysis: InventiveStepAnalysisResponse,
  logicKey: InventiveStepLogicKey
) {
  const argumentType = LOGIC_KEY_TO_ARGUMENT_TYPE[logicKey];
  return analysis.arguments.find((argument) => argument.argumentType === argumentType);
}

const SELECTED_LOGICS_STORAGE_KEY_PREFIX = "ipx-inventive-step-selected-logics-";

// recommended 필드는 서버에 저장되지 않는 화면 전용 선택 상태라 새로고침하면 사라짐
// -> 사용자가 직접 고른 선택 값은 브라우저(localStorage)에 별도로 남겨서 새로고침해도 유지되게 한다.
// 키는 반드시 analysisId(이 특허 비교 분석 결과 고유 id) 기준으로 잡는다.
// caseId만으로 잡으면 같은 사건에서 다른 특허를 분석했을 때 이전 특허의 선택값이 섞여 보일 수 있다.
function loadStoredSelection(analysisId: number): Set<InventiveStepLogicKey> | null {
  if (typeof window === "undefined") return null;

  try {
    const raw = window.localStorage.getItem(`${SELECTED_LOGICS_STORAGE_KEY_PREFIX}${analysisId}`);
    if (raw === null) return null;

    const parsed = JSON.parse(raw) as unknown;
    if (!Array.isArray(parsed)) return null;

    return new Set(
      parsed.filter((key): key is InventiveStepLogicKey => key in LOGIC_KEY_TO_ARGUMENT_TYPE)
    );
  } catch {
    return null;
  }
}

function saveStoredSelection(analysisId: number, selected: Set<InventiveStepLogicKey>) {
  if (typeof window === "undefined") return;

  try {
    window.localStorage.setItem(
      `${SELECTED_LOGICS_STORAGE_KEY_PREFIX}${analysisId}`,
      JSON.stringify([...selected])
    );
  } catch {
    // 시크릿 모드 등 localStorage 사용이 막힌 환경이어도 화면 동작에는 지장 없도록 무시
  }
}

// 개별 특허 진보성 분석 페이지: 분석 결과 조회 + 논리 선택/수정 저장
export function useInventiveStepAnalysis(id: string) {
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

  useEffect(() => {
    if (!isAuthInitialized || !accessToken) return;

    let canceled = false;

    getInventiveStepAnalysis(id)
      .then((data) => {
        if (canceled) return;

        setRequestError(null);
        setResult({ caseId: id, analysis: data });
        setSelectedLogics(
          loadStoredSelection(data.analysisId) ??
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
  const isLoading = !isAuthInitialized || Boolean(accessToken && !analysis && !errorMessage);

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
  };

  // 진보성 논리 선택/해제는 백엔드에 저장하지 않는 화면 전용 상태 -> API 호출 없이 로컬 상태만 바꾼다.
  const toggleLogic = (key: InventiveStepLogicKey) => {
    if (!analysis || !getArgument(analysis, key)) return;

    const analysisId = analysis.analysisId;

    setSelectedLogics((previous) => {
      const next = new Set(previous);
      if (next.has(key)) {
        next.delete(key);
      } else {
        next.add(key);
      }
      saveStoredSelection(analysisId, next);
      return next;
    });
  };

  const reload = () => {
    setResult(null);
    setRequestError(null);
    setSelectedLogics(new Set());
    setReloadCount((count) => count + 1);
  };

  return {
    analysis,
    errorMessage,
    isLoading,
    selectedLogics,
    aiRecommendedArgumentIds,
    toggleLogic,
    saveArgumentContent,
    reload,
  };
}
