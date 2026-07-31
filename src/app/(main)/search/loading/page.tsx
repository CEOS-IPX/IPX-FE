"use client";

import { Suspense, useId } from "react";
import StopIcon from "@/components/icons/icon-stop.svg";
import { Button } from "@/components/ui/Button";
import { useSearchProgress } from "@/hooks/useSearchProgress";

const RADIUS = 88;
const CIRCUMFERENCE = 2 * Math.PI * RADIUS;

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
  const { percent, label, terminalMessage, pollError, cancelError, isStopping, handleStop } =
    useSearchProgress();

  return (
    <div className="flex h-full min-h-full w-full flex-col items-center justify-center gap-8 bg-bg-surface">
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

      <div className="flex flex-col items-center gap-2">
        <Button variant="secondary" size="sm" onClick={handleStop} disabled={isStopping}>
          <StopIcon
            className="h-4 w-4 text-icon-neutral-default [&_path]:fill-current"
            aria-hidden
          />
          탐색 중단하기
        </Button>
        {cancelError && <p className="text-label-13 text-error-default">{cancelError}</p>}
      </div>
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
