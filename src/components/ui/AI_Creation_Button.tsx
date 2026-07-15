import { forwardRef } from "react";
import { cn } from "@/lib/cn";
import AICreationIcon from "@/components/icons/icon-aiCreation.svg";

export type AICreationButtonProps = React.ButtonHTMLAttributes<HTMLButtonElement>;

export const AICreationButton = forwardRef<HTMLButtonElement, AICreationButtonProps>(
  ({ className, type = "button", ...props }, ref) => (
    <button
      ref={ref}
      type={type}
      className={cn(
        "inline-flex cursor-pointer items-center gap-1 rounded-sm border border-stroke-primary bg-bg-surface py-2 pl-2 pr-3 text-label-15 text-primary-default transition-colors hover:bg-bg-neutral-hover active:bg-bg-neutral-subtle",
        className
      )}
      {...props}
    >
      <AICreationIcon className="h-5 w-5 [&_path]:fill-icon-primary-emphasize" aria-hidden />
      AI 자동 생성
    </button>
  )
);

AICreationButton.displayName = "AICreationButton";
