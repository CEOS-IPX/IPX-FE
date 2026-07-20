"use client";

import MinusIcon from "@/components/icons/icon-minus.svg";
import PlusIcon from "@/components/icons/icon-plus.svg";

const MIN_RESULT_COUNT = 1;
const MAX_RESULT_COUNT = 30;

type ResultCountButtonProps = {
  count: number;
  onChange: (count: number) => void;
};

export function ResultCountButton({ count, onChange }: ResultCountButtonProps) {
  return (
    <div className="flex items-center overflow-hidden rounded-sm bg-bg-surface border border-outline-sub text-icon-neutral-subtle">
      <button
        type="button"
        onClick={() => onChange(Math.max(MIN_RESULT_COUNT, count - 1))}
        disabled={count <= MIN_RESULT_COUNT}
        className="flex h-12 w-11 px-3 py-2 items-center justify-center transition-colors hover:bg-bg-neutral-hover active:bg-bg-neutral-subtle disabled:cursor-not-allowed disabled:opacity-40 disabled:hover:bg-transparent"
      >
        <MinusIcon className="h-5 w-5 [&_path]:fill-current" />
      </button>

      <span className="flex w-16.5 h-12 py-2 items-center justify-center border-x border-outline-sub text-label-emphasis-17 text-title-primary">
        {count}개
      </span>

      <button
        type="button"
        onClick={() => onChange(Math.min(MAX_RESULT_COUNT, count + 1))}
        disabled={count >= MAX_RESULT_COUNT}
        className="flex h-12 w-11 px-3 py-2 items-center justify-center transition-colors hover:bg-bg-neutral-hover active:bg-bg-neutral-subtle disabled:cursor-not-allowed disabled:opacity-40 disabled:hover:bg-transparent"
      >
        <PlusIcon className="h-5 w-5 [&_path]:fill-current" />
      </button>
    </div>
  );
}
