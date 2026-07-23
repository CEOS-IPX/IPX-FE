"use client";

import { Suspense, useEffect, useId, useState } from "react";
import { useRouter, useSearchParams } from "next/navigation";
import StopIcon from "@/components/icons/icon-stop.svg";
import { Button } from "@/components/ui/Button";
import { cancelSearch, getSearchStatus } from "@/lib/api/search";
import type { SearchStatusResponse } from "@/types/search.type";

const DEFAULT_RESULT_COUNT = 10;
const POLL_INTERVAL_MS = 2000;
const MAX_POLL_RETRIES = 5;

// 이 부분은 테스트용!
const getMockSteps = (resultCount: number) => [
  { percent: 12, label: "검색 의도 해석 중" },
  { percent: 34, label: "선행 특허 탐색 중" },
  { percent: 70, label: `${resultCount}개의 기술을 찾고 있어요` },
  { percent: 100, label: `${resultCount}개의 기술을 찾고 있어요` },
];

const RADIUS = 88;
const CIRCUMFERENCE = 2 * Math.PI * RADIUS;

const TERMINAL_MESSAGE: Record<string, (status: SearchStatusResponse) => string> = {
  no_results: () => "조건에 맞는 선행기술을 찾지 못했어요.",
  invalid_input: (status) => status.reasonInvalid || "입력하신 내용을 다시 확인해주세요.",
  failed: (status) => status.error || status.reasonInvalid || "탐색 중 오류가 발생했습니다.",
  cancelled: () => "탐색이 취소되었습니다.",
};

function ProgressRing({ percent }: { percent: number }) {
  const offset = CIRCUMFERENCE - (percent / 100) * CIRCUMFERENCE;
  const gradientId = useId();
  const shadowId = useId();

  return (
    <div className="relative flex h-50 w-50 items-center justify-center">
      <svg className="h-full w-full -rotate-90" viewBox="0 0 200 200" aria-hidden>
        <defs>
          <linearGradient id={gradientId} x1="0%" y1="0%" x2="100%" y2="100%">
            <stop offset="0%" stopColor="#6799F6" />
            <stop offset="100%" stopColor="#0059FF" />
          </linearGradient>
          <filter id={shadowId} x="-50%" y="-50%" width="200%" height="200%">
            <feDropShadow dx="0" dy="0" stdDeviation="4" floodColor="#0059FF" floodOpacity="0.45" />
          </filter>
        </defs>

        <circle
          cx="100"
          cy="100"
          r={RADIUS}
          fill="none"
          strokeWidth="12"
          className="stroke-bg-neutral-hover"
        />
        <circle
          cx="100"
          cy="100"
          r={RADIUS}
          fill="none"
          strokeWidth="12"
          strokeLinecap="round"
          strokeDasharray={CIRCUMFERENCE}
          strokeDashoffset={offset}
          stroke={`url(#${gradientId})`}
          filter={`url(#${shadowId})`}
          className="transition-[stroke-dashoffset] duration-500 ease-out"
        />
      </svg>
      <span className="absolute flex items-baseline text-headline-emphasis-46 text-primary-default">
        {percent}
        <span className="text-headline-emphasis-32 text-title-primary">%</span>
      </span>
    </div>
  );
}

function LoadingContent() {
  const router = useRouter();
  const searchParams = useSearchParams();
  const resultCount = Number(searchParams.get("count")) || DEFAULT_RESULT_COUNT;
  const caseId = searchParams.get("caseId");

  // caseId가 있으면 실제 진행률 API를 폴링, 없으면 데모용 mock 진행을 보여줌(이 부분은 테스트용)
  const [status, setStatus] = useState<SearchStatusResponse | null>(null);
  const [pollError, setPollError] = useState<string | null>(null);
  const [mockStepIndex, setMockStepIndex] = useState(0);
  const [isStopping, setIsStopping] = useState(false);
  const mockSteps = getMockSteps(resultCount);

  const handleStop = async () => {
    if (!caseId) {
      router.push("/search");
      return;
    }

    setIsStopping(true);
    try {
      await cancelSearch(Number(caseId));
    } catch (err) {
      console.error("탐색 취소 요청 실패:", err);
    } finally {
      router.push("/search");
    }
  };

  useEffect(() => {
    if (!caseId) return;

    let cancelled = false;
    let timer: ReturnType<typeof setTimeout>;
    let consecutiveErrors = 0;

    const poll = async () => {
      try {
        const result = await getSearchStatus(Number(caseId));
        if (cancelled) return;
        consecutiveErrors = 0;
        setStatus(result);
        setPollError(null);

        if (result.status === "in_progress") {
          timer = setTimeout(poll, POLL_INTERVAL_MS);
        } else if (result.status === "completed") {
          router.push(`/search/result?caseId=${caseId}`);
        }
      } catch (err) {
        if (cancelled) return;
        consecutiveErrors += 1;

        const message =
          err instanceof Error && err.message
            ? err.message
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
  }, [caseId, router]);

  useEffect(() => {
    if (caseId) return;
    if (mockStepIndex >= mockSteps.length - 1) return;
    const timer = setTimeout(() => setMockStepIndex((prev) => prev + 1), 1200);
    return () => clearTimeout(timer);
  }, [caseId, mockStepIndex, mockSteps.length]);

  const percent = caseId ? (status?.progress ?? 0) : mockSteps[mockStepIndex].percent;
  const label = caseId ? (status?.step ?? "탐색 준비 중") : mockSteps[mockStepIndex].label;
  const terminalMessage =
    caseId && status && status.status !== "in_progress" && status.status !== "completed"
      ? TERMINAL_MESSAGE[status.status]?.(status)
      : null;

  return (
    <div className="flex h-full min-h-full w-full flex-col items-center justify-center gap-8">
      <ProgressRing percent={percent} />

      <div className="flex flex-col items-center gap-2">
        <p className="text-headline-emphasis-24 text-title-primary">{label}</p>
        {terminalMessage || pollError ? (
          <p className="text-title-18 text-error-default">{terminalMessage ?? pollError}</p>
        ) : (
          <p className="text-title-18 text-body-disabled">
            다른 페이지로 이동해도 탐색은 계속 진행됩니다.
          </p>
        )}
      </div>

      <Button variant="secondary" size="sm" onClick={handleStop} disabled={isStopping}>
        <StopIcon className="h-4 w-4 text-icon-neutral-default [&_path]:fill-current" aria-hidden />
        탐색 중단하기
      </Button>
    </div>
  );
}

export default function LoadingPage() {
  return (
    <Suspense fallback={null}>
      <LoadingContent />
    </Suspense>
  );
}
