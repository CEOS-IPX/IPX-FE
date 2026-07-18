"use client";

import { forwardRef } from "react";
import PrintIcon from "@/components/icons/icon-print.svg";
import { cn } from "@/lib/cn";

export type PrintButtonProps = React.ButtonHTMLAttributes<HTMLButtonElement>;

export const PrintButton = forwardRef<HTMLButtonElement, PrintButtonProps>(
  ({ className, type = "button", onClick, ...props }, ref) => {
    return (
      <button
        ref={ref}
        type={type}
        aria-label="인쇄하기"
        onClick={(e) => {
          onClick?.(e);
          window.print();
        }}
        className={cn(
          "flex h-8 w-8 shrink-0 cursor-pointer items-center justify-center rounded-full bg-bg-surface shadow-[0px_1px_6px_0px_rgba(144,155,165,0.36)] transition-colors hover:bg-bg-neutral-hover active:bg-bg-neutral-subtle",
          className
        )}
        {...props}
      >
        <PrintIcon
          className="h-5 w-5 text-icon-neutral-emphasize [&_path]:fill-current"
          aria-hidden
        />
      </button>
    );
  }
);

PrintButton.displayName = "PrintButton";
