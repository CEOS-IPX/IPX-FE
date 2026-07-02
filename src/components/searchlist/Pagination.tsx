"use client";

import { forwardRef } from "react";
import ChevronIcon from "@/components/icons/icon-back.svg";
import { cn } from "@/lib/cn";

export type PaginationProps = Omit<React.HTMLAttributes<HTMLDivElement>, "onChange"> & {
  page: number;
  totalPages: number;
  onChange?: (page: number) => void;
};

export const Pagination = forwardRef<HTMLDivElement, PaginationProps>(
  ({ page, totalPages, onChange, className, ...props }, ref) => {
    const goTo = (next: number) => {
      if (next < 1 || next > totalPages) return;
      onChange?.(next);
    };

    return (
      <div ref={ref} className={cn("inline-flex items-center gap-7", className)} {...props}>
        <button
          type="button"
          onClick={() => goTo(page - 1)}
          disabled={page <= 1}
          aria-label="이전 페이지"
          className="text-icon-neutral-emphasize inline-flex h-6 w-6 cursor-pointer items-center justify-center disabled:cursor-not-allowed"
        >
          <ChevronIcon className="h-6 w-6 rotate-180" />
        </button>
        <div className="flex items-center gap-5">
          {Array.from({ length: totalPages }, (_, i) => i + 1).map((n) => {
            const active = n === page;
            return (
              <button
                key={n}
                type="button"
                onClick={() => goTo(n)}
                aria-current={active ? "page" : undefined}
                className={cn(
                  "text-label-15 inline-flex h-6 w-6 cursor-pointer items-center justify-center text-center",
                  active ? "text-title-secondary" : "text-caption-label"
                )}
              >
                {n}
              </button>
            );
          })}
        </div>
        <button
          type="button"
          onClick={() => goTo(page + 1)}
          disabled={page >= totalPages}
          aria-label="다음 페이지"
          className="text-icon-neutral-emphasize inline-flex h-6 w-6 cursor-pointer items-center justify-center disabled:cursor-not-allowed"
        >
          <ChevronIcon className="h-6 w-6" />
        </button>
      </div>
    );
  }
);

Pagination.displayName = "Pagination";
