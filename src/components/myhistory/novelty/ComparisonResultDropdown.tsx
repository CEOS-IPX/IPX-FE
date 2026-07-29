"use client";

import { useEffect, useRef, useState } from "react";
import ExpandIcon from "@/components/icons/icon-expand.svg";
import { cn } from "@/lib/cn";
import type { NoveltyComparisonResult } from "@/types/novelty.type";

const COMPARISON_RESULT_OPTIONS: Array<{
  value: NoveltyComparisonResult;
  label: string;
}> = [
  { value: "IDENTICAL", label: "동일" },
  { value: "SIMILAR", label: "유사" },
  { value: "NOVEL", label: "신규" },
];

interface ComparisonResultDropdownProps {
  value: NoveltyComparisonResult;
  disabled?: boolean;
  onChange: (value: NoveltyComparisonResult) => void;
}

// SortingTag(검색결과 정렬 드롭다운)와 동일한 스타일 -> 값 동기화가 필요해서(취소 시 원래 값으로 복원 등) 완전히 controlled로 구현
export function ComparisonResultDropdown({
  value,
  disabled,
  onChange,
}: ComparisonResultDropdownProps) {
  const [open, setOpen] = useState(false);
  const containerRef = useRef<HTMLDivElement>(null);
  const selectedLabel = COMPARISON_RESULT_OPTIONS.find((option) => option.value === value)?.label;

  useEffect(() => {
    const handlePointerDown = (event: PointerEvent) => {
      if (!containerRef.current?.contains(event.target as Node)) {
        setOpen(false);
      }
    };

    document.addEventListener("pointerdown", handlePointerDown);
    return () => document.removeEventListener("pointerdown", handlePointerDown);
  }, []);

  return (
    <div ref={containerRef} className="relative inline-flex w-24">
      <button
        type="button"
        disabled={disabled}
        aria-haspopup="listbox"
        aria-expanded={open}
        className={cn(
          "flex w-full cursor-pointer items-center justify-between rounded-md border border-outline-default bg-bg-surface py-2 pr-2 pl-3 text-body-17 text-body-primary",
          disabled && "cursor-not-allowed"
        )}
        onClick={() => setOpen((current) => !current)}
      >
        {selectedLabel}
        <ExpandIcon
          className={cn(
            "h-5 w-5 shrink-0 transition-transform [&_path]:fill-current",
            open ? "rotate-180 text-primary-default" : "text-icon-neutral-default"
          )}
          aria-hidden
        />
      </button>

      {open && (
        <div
          role="listbox"
          aria-label="대비 결과 선택"
          className="absolute top-[calc(100%+0.5rem)] left-0 z-10 flex w-full flex-col items-start justify-center rounded-md bg-bg-surface shadow-[0_1px_6px_0_rgba(144,155,165,0.36)]"
        >
          {COMPARISON_RESULT_OPTIONS.map((option) => {
            const active = option.value === value;

            return (
              <button
                key={option.value}
                type="button"
                role="option"
                aria-selected={active}
                className={cn(
                  "flex w-full cursor-pointer items-center gap-2 rounded-sm px-3 py-2.5 text-left text-body-17 hover:bg-bg-neutral-hover",
                  active ? "text-primary-default" : "text-body-primary"
                )}
                onClick={() => {
                  onChange(option.value);
                  setOpen(false);
                }}
              >
                {option.label}
              </button>
            );
          })}
        </div>
      )}
    </div>
  );
}
