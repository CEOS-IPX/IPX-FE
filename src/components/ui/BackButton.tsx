"use client";

import { forwardRef } from "react";
import { useRouter } from "next/navigation";
import BackIcon from "@/components/icons/icon-back.svg";
import { cn } from "@/lib/cn";

export type BackButtonProps = React.ButtonHTMLAttributes<HTMLButtonElement>;

export const BackButton = forwardRef<HTMLButtonElement, BackButtonProps>(
  ({ className, type = "button", onClick, ...props }, ref) => {
    const router = useRouter();

    return (
      <button
        ref={ref}
        type={type}
        aria-label="이전 페이지로 이동"
        onClick={(e) => {
          onClick?.(e);
          router.back();
        }}
        className={cn(
          "flex h-8 w-8 shrink-0 cursor-pointer items-center justify-center rounded-full bg-bg-surface shadow-[0px_1px_6px_0px_rgba(144,155,165,0.36)] transition-colors hover:bg-bg-neutral-hover active:bg-bg-neutral-subtle",
          className
        )}
        {...props}
      >
        <BackIcon
          className="h-5 w-5 -scale-x-100 text-icon-neutral-emphasize [&_path]:fill-current"
          aria-hidden
        />
      </button>
    );
  }
);

BackButton.displayName = "BackButton";
