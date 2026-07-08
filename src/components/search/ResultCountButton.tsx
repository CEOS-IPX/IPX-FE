"use client";

import { useState } from "react";
import MinusIcon from "@/components/icons/icon-minus.svg";
import PlusIcon from "@/components/icons/icon-plus.svg";

export function ResultCountButton() {
  const [count, setCount] = useState(10);

  return (
    <div className="flex items-center overflow-hidden rounded-sm bg-bg-surface border border-outline-sub text-icon-neutral-subtle">
      <button
        type="button"
        onClick={() => setCount((n) => Math.max(1, n - 1))}
        className="flex h-12 w-11 px-3 py-2 items-center justify-center transition-colors hover:bg-bg-neutral-hover active:bg-bg-neutral-subtle"
      >
        <MinusIcon className="h-5 w-5 [&_path]:fill-current" />
      </button>

      <span className="flex w-16.5 h-12 py-2 items-center justify-center border-x border-outline-sub text-label-emphasis-17 text-title-primary">
        {count}개
      </span>

      <button
        type="button"
        onClick={() => setCount((n) => n + 1)}
        className="flex h-12 w-11 px-3 py-2 items-center justify-center transition-colors hover:bg-bg-neutral-hover active:bg-bg-neutral-subtle"
      >
        <PlusIcon className="h-5 w-5 [&_path]:fill-current" />
      </button>
    </div>
  );
}
