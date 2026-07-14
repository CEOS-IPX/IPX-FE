"use client";

import { forwardRef } from "react";
import { Checkbox } from "./Checkbox";
import { cn } from "@/lib/cn";

export type ResultListHeaderProps = React.HTMLAttributes<HTMLDivElement> & {
  variant?: "selectable" | "selected" | "readonly";
  checked?: boolean;
  indeterminate?: boolean;
  selectedCount?: number;
  onCheckedChange?: (checked: boolean) => void;
};

export const ResultListHeader = forwardRef<HTMLDivElement, ResultListHeaderProps>(
  (
    {
      variant = "selectable",
      className,
      checked,
      indeterminate,
      selectedCount = 0,
      onCheckedChange,
      ...props
    },
    ref
  ) => {
    const showCheckbox = variant !== "readonly";

    return (
      <div
        ref={ref}
        className={cn(
          "flex w-[64rem] items-center gap-9 border-y border-outline-sub px-3 py-0.5",
          variant === "selected" && "h-[2.8125rem]",
          className
        )}
        {...props}
      >
        {showCheckbox && (
          <Checkbox
            aria-label={variant === "selected" ? "목록 전체 선택" : "전체 선택"}
            checked={checked}
            indeterminate={variant === "selected" ? true : indeterminate}
            onChange={(event) => onCheckedChange?.(event.target.checked)}
            className="[&>span]:size-6"
          />
        )}

        {variant === "selected" ? (
          <p className="flex items-center gap-1 text-label-15">
            <span className="text-primary-default">{selectedCount}</span>
            <span className="text-body-primary">개 선택</span>
          </p>
        ) : (
          <div className="flex flex-1 items-center text-label-15 text-body-primary">
            <div
              className={cn(
                "flex flex-1 items-center gap-2.5 p-2.5",
                variant === "readonly" ? "justify-start" : "justify-center"
              )}
            >
              제목/보유기관
            </div>
            <div className="flex w-25 items-center justify-center gap-2.5 p-2.5">상태</div>
            <div className="flex w-25 items-center justify-center gap-2.5 p-2.5">적합도</div>
          </div>
        )}
      </div>
    );
  }
);

ResultListHeader.displayName = "ResultListHeader";
