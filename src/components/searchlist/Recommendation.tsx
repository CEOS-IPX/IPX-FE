import type { HTMLAttributes } from "react";
import { cn } from "@/lib/cn";

export type RecommendationProps = HTMLAttributes<HTMLDivElement> & {
  reason: string;
};

export function Recommendation({ reason, className, ...props }: RecommendationProps) {
  return (
    <div
      className={cn(
        "flex self-stretch flex-col items-center justify-center gap-1 rounded-[0.375rem] bg-bg-neutral-hover p-4",
        className
      )}
      {...props}
    >
      <div className="flex w-full items-center gap-3">
        <strong className="w-[3.4375rem] shrink-0 text-body-emphasis-15 text-title-primary">
          추천 이유
        </strong>
        <span className="h-4 w-px shrink-0 bg-icon-neutral-subtle" aria-hidden />
        <p className="min-w-0 flex-1 line-clamp-1 text-body-15 text-body-disabled">{reason}</p>
      </div>
    </div>
  );
}
