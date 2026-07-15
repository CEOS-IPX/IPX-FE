import { forwardRef } from "react";
import SearchIcon from "@/components/icons/icon-search.svg";
import { cn } from "@/lib/cn";

export type ListSearchFieldProps = Omit<React.InputHTMLAttributes<HTMLInputElement>, "size"> & {
  containerClassName?: string;
};

export const ListSearchField = forwardRef<HTMLInputElement, ListSearchFieldProps>(
  ({ className, containerClassName, ...props }, ref) => (
    <div
      className={cn(
        "flex w-[25rem] items-center gap-2 rounded-[0.375rem] border border-outline-sub bg-bg-neutral-hover px-3 py-2.5",
        containerClassName
      )}
    >
      <SearchIcon className="h-6 w-6 shrink-0 text-icon-neutral-default" aria-hidden />
      <input
        ref={ref}
        className={cn(
          "min-w-0 flex-1 bg-transparent text-body-17 text-body-primary outline-none placeholder:text-caption-label",
          className
        )}
        {...props}
      />
    </div>
  )
);

ListSearchField.displayName = "ListSearchField";
