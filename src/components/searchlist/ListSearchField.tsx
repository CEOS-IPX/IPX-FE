import { forwardRef } from "react";
import SearchIcon from "@/components/icons/icon-search.svg";
import CancelIcon from "@/components/icons/icon-cancel.svg";
import { cn } from "@/lib/cn";

export type ListSearchFieldProps = Omit<React.InputHTMLAttributes<HTMLInputElement>, "size"> & {
  containerClassName?: string;
  onClear?: () => void;
};

export const ListSearchField = forwardRef<HTMLInputElement, ListSearchFieldProps>(
  ({ className, containerClassName, value, onClear, ...props }, ref) => (
    <div
      className={cn(
        "flex w-100 items-center gap-2 rounded-md border border-outline-sub bg-bg-neutral-hover px-3 py-2.5",
        containerClassName
      )}
    >
      <SearchIcon className="h-6 w-6 shrink-0 text-icon-neutral-default" aria-hidden />
      <input
        ref={ref}
        value={value}
        className={cn(
          "min-w-0 flex-1 bg-transparent text-body-17 text-body-primary outline-none placeholder:text-caption-label",
          className
        )}
        {...props}
      />
      {onClear && typeof value === "string" && value.length > 0 && (
        <button
          type="button"
          aria-label="검색어 지우기"
          onClick={onClear}
          className="flex shrink-0 cursor-pointer items-center justify-center"
        >
          <CancelIcon className="h-4 w-4 shrink-0 text-icon-neutral-default [&_path]:fill-current" />
        </button>
      )}
    </div>
  )
);

ListSearchField.displayName = "ListSearchField";
