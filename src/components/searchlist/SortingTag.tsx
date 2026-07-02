import { forwardRef } from "react";
import ExpandIcon from "@/components/icons/icon-expand.svg";
import { cn } from "@/lib/cn";

export type SortingTagProps = React.ButtonHTMLAttributes<HTMLButtonElement> & {
  label: string;
};

export const SortingTag = forwardRef<HTMLButtonElement, SortingTagProps>(
  ({ label, className, type = "button", ...props }, ref) => (
    <button
      ref={ref}
      type={type}
      className={cn(
        "border-outline-default text-body-secondary text-label-15 inline-flex cursor-pointer items-center justify-center rounded-full border bg-bg-surface py-2 pr-2 pl-4",
        className
      )}
      {...props}
    >
      {label}
      <ExpandIcon className="text-icon-neutral-default h-5 w-5" aria-hidden />
    </button>
  )
);

SortingTag.displayName = "SortingTag";
