import { forwardRef } from "react";
import { Checkbox } from "./Checkbox";
import { cn } from "@/lib/cn";

export type ResultListHeaderProps = React.HTMLAttributes<HTMLDivElement> & {
  checked?: boolean;
  indeterminate?: boolean;
  onCheckedChange?: (checked: boolean) => void;
};

export const ResultListHeader = forwardRef<HTMLDivElement, ResultListHeaderProps>(
  ({ className, checked, indeterminate, onCheckedChange, ...props }, ref) => (
    <div
      ref={ref}
      className={cn("bg-none flex w-full items-center gap-9 rounded-xs px-3 py-0.5", className)}
      {...props}
    >
      <Checkbox
        checked={checked}
        indeterminate={indeterminate}
        onChange={(e) => onCheckedChange?.(e.target.checked)}
      />
      <div className="flex flex-1 items-center">
        <div className="text-body-primary flex flex-1 items-center justify-center p-2.5 text-label-15">
          제목/보유기관
        </div>
        <div className="text-body-primary flex w-25 items-center justify-center p-2.5 text-label-15">
          상태
        </div>
        <div className="text-body-primary flex w-25 items-center justify-center p-2.5 text-label-15">
          적합도
        </div>
      </div>
    </div>
  )
);

ResultListHeader.displayName = "ResultListHeader";
