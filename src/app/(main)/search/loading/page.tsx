"use client";

import { Suspense, useEffect, useState } from "react";
import { useRouter, useSearchParams } from "next/navigation";
import StopIcon from "@/components/icons/icon-stop.svg";
import { Button } from "@/components/ui/Button";

const DEFAULT_RESULT_COUNT = 10;

// 추후 진행 상태 폴링 API 연동 시 교체 (현재 단계 + 퍼센트). 찾는 기술 개수는 이전 페이지에서 사용자가 설정한 값.
const getSteps = (resultCount: number) => [
  { percent: 12, label: "검색 의도 해석 중" },
  { percent: 34, label: "선행 특허 탐색 중" },
  { percent: 70, label: `${resultCount}개의 기술을 찾고 있어요` },
  { percent: 100, label: `${resultCount}개의 기술을 찾고 있어요` },
];

const RADIUS = 88;
const CIRCUMFERENCE = 2 * Math.PI * RADIUS;

function LoadingContent() {
  const router = useRouter();
  const searchParams = useSearchParams();
  const resultCount = Number(searchParams.get("count")) || DEFAULT_RESULT_COUNT;
  const steps = getSteps(resultCount);
  const [stepIndex, setStepIndex] = useState(0);

  useEffect(() => {
    if (stepIndex >= steps.length - 1) return;
    const timer = setTimeout(() => setStepIndex((prev) => prev + 1), 1200);
    return () => clearTimeout(timer);
  }, [stepIndex, steps.length]);

  const { percent, label } = steps[stepIndex];
  const offset = CIRCUMFERENCE - (percent / 100) * CIRCUMFERENCE;

  return (
    <div className="flex h-full min-h-screen w-full flex-col items-center justify-center gap-8">
      <div className="relative flex h-50 w-50 items-center justify-center">
        <svg className="h-full w-full -rotate-90" viewBox="0 0 200 200" aria-hidden>
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
            className="stroke-bg-primary transition-[stroke-dashoffset] duration-500 ease-out"
          />
        </svg>
        <span className="absolute flex items-baseline text-headline-emphasis-32 text-title-primary">
          {percent}
          <span className="text-title-emphasis-22 text-title-secondary">%</span>
        </span>
      </div>

      <div className="flex flex-col items-center gap-1">
        <p className="text-title-emphasis-20 text-title-primary">{label}</p>
        <p className="text-body-15 text-caption-label">
          다른 페이지로 이동해도 탐색은 계속 진행됩니다.
        </p>
      </div>

      <Button variant="secondary" size="sm" onClick={() => router.push("/search")}>
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
