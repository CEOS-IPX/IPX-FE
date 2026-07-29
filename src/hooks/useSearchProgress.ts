"use client";

import { useEffect, useState } from "react";
import { useRouter, useSearchParams } from "next/navigation";
import { cancelSearch, getSearchStatus } from "@/lib/api/search";
import { ApiError } from "@/lib/api/error";
import { useActiveSearchStore } from "@/store/activeSearchStore";
import { useAuthStore } from "@/store/authStore";
import { useSearchFormStore } from "@/store/searchFormStore";
import type { SearchStatusResponse } from "@/types/search.type";

const DEFAULT_RESULT_COUNT = 10;
const POLL_INTERVAL_MS = 2000;
const MAX_POLL_RETRIES = 5;

// 탐색 진행률 조회 api 에러코드별 메시지
const SEARCH_STATUS_ERROR_MESSAGES: Record<string, string> = {
  SC001: "인증이 필요합니다.",
  CA001: "사건을 찾을 수 없습니다.",
  CA002: "해당 사건에 접근할 권한이 없습니다.",
  S001: "검색 정보를 찾을 수 없습니다.",
  R001: "일시적인 시스템 오류입니다. 잠시 후 다시 시도해주세요.",
  C002: "서버 내부 오류가 발생했습니다.",
};

// 탐색 중단 api 에러코드별 메시지 (조회 api와 코드 구성이 동일)
const SEARCH_CANCEL_ERROR_MESSAGES = SEARCH_STATUS_ERROR_MESSAGES;

const TERMINAL_MESSAGE: Record<string, (status: SearchStatusResponse) => string> = {
  no_results: () => "조건에 맞는 선행기술을 찾지 못했어요.",
  invalid_input: (status) => status.reasonInvalid || "입력하신 내용을 다시 확인해주세요.",
  failed: (status) => status.error || status.reasonInvalid || "탐색 중 오류가 발생했습니다.",
  cancelled: () => "탐색이 취소되었습니다.",
};

// 선행기술 탐색 로딩 페이지: 진행 상태 폴링 + 중단하기
// activeSearchStore에 진행 중인 검색을 저장해두어, URL 쿼리 없이 이 페이지로 돌아와도 진행 상황을 복구할 수 있게 한다.
export function useSearchProgress() {
  const router = useRouter();
  const searchParams = useSearchParams();
  const activeSearch = useActiveSearchStore((state) => state.activeSearch);
  const setActiveSearch = useActiveSearchStore((state) => state.setActiveSearch);
  const clearActiveSearch = useActiveSearchStore((state) => state.clearActiveSearch);
  const resetSearchForm = useSearchFormStore((state) => state.resetForm);
  const isAuthInitialized = useAuthStore((state) => state.isInitialized);
  const accessToken = useAuthStore((state) => state.accessToken);

  const caseId = searchParams.get("caseId") ?? activeSearch?.caseId.toString() ?? null;
  const title = searchParams.get("title") ?? activeSearch?.title ?? null;
  const resultCount =
    Number(searchParams.get("count") ?? activeSearch?.resultCount) || DEFAULT_RESULT_COUNT;

  const [status, setStatus] = useState<SearchStatusResponse | null>(null);
  const [pollError, setPollError] = useState<string | null>(null);
  const [cancelError, setCancelError] = useState<string | null>(null);
  const [isStopping, setIsStopping] = useState(false);

  const handleStop = async () => {
    if (!caseId) {
      router.push("/search?resume=1");
      return;
    }

    setCancelError(null);
    setIsStopping(true);
    try {
      await cancelSearch(Number(caseId));
      clearActiveSearch();
      router.push("/search?resume=1");
    } catch (err) {
      if (err instanceof ApiError) {
        setCancelError(
          SEARCH_CANCEL_ERROR_MESSAGES[err.errorCode] ||
            err.message ||
            "탐색 중단 중 오류가 발생했습니다."
        );
      } else {
        setCancelError("탐색 중단 중 오류가 발생했습니다.");
      }
    } finally {
      setIsStopping(false);
    }
  };

  useEffect(() => {
    if (!caseId) {
      router.push("/search?resume=1");
      return;
    }
    if (isStopping || !isAuthInitialized || !accessToken) return;

    setActiveSearch({
      caseId: Number(caseId),
      resultCount,
      title: title ?? "",
    });

    let cancelled = false;
    let timer: ReturnType<typeof setTimeout>;
    let consecutiveErrors = 0;

    const poll = async () => {
      try {
        const result = await getSearchStatus(Number(caseId));
        if (cancelled || isStopping) return;
        consecutiveErrors = 0;
        setStatus(result);
        setPollError(null);

        if (result.status === "in_progress") {
          timer = setTimeout(poll, POLL_INTERVAL_MS);
        } else if (result.status === "completed") {
          clearActiveSearch();
          resetSearchForm();
          router.push(
            `/search/result?caseId=${caseId}${title ? `&title=${encodeURIComponent(title)}` : ""}`
          );
        } else {
          clearActiveSearch();
        }
      } catch (err) {
        if (cancelled) return;
        consecutiveErrors += 1;

        const message =
          err instanceof ApiError
            ? SEARCH_STATUS_ERROR_MESSAGES[err.errorCode] ||
              err.message ||
              "진행 상태 조회 중 오류가 발생했습니다."
            : "진행 상태 조회 중 오류가 발생했습니다.";

        if (consecutiveErrors < MAX_POLL_RETRIES) {
          // 일시적인 네트워크 오류일 수 있으니 바로 포기하지 않고 재시도
          setPollError(message);
          timer = setTimeout(poll, POLL_INTERVAL_MS);
        } else {
          setPollError(message);
        }
      }
    };

    poll();
    return () => {
      cancelled = true;
      clearTimeout(timer);
    };
  }, [
    accessToken,
    caseId,
    clearActiveSearch,
    isAuthInitialized,
    isStopping,
    resultCount,
    resetSearchForm,
    router,
    setActiveSearch,
    title,
  ]);

  const percent = status?.progress ?? 0;
  const label = status?.step ?? "탐색 준비 중";
  const terminalMessage =
    status && status.status !== "in_progress" && status.status !== "completed"
      ? TERMINAL_MESSAGE[status.status]?.(status)
      : null;

  return {
    percent,
    label,
    terminalMessage,
    pollError,
    cancelError,
    isStopping,
    handleStop,
  };
}
