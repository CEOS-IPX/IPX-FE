import { forwardRef } from "react";
import { cn } from "@/lib/cn";

export type SaveButtonProps = React.ButtonHTMLAttributes<HTMLButtonElement> & {
  count: number;
};

export const SaveButton = forwardRef<HTMLButtonElement, SaveButtonProps>(
  ({ count, className, type = "button", ...props }, ref) => (
    <button
      ref={ref}
      type={type}
      className={cn(
        "border-outline-default text-body-secondary text-label-emphasis-17 inline-flex cursor-pointer items-center justify-center gap-0.5 rounded-lg border bg-bg-surface py-2.5 pr-4 pl-5 transition-colors hover:bg-bg-neutral-hover active:bg-bg-neutral-subtle",
        className
      )}
      {...props}
    >
      <span className="text-primary-sub">{count}</span>
      <span>개 저장하기</span>
    </button>
  )
);

SaveButton.displayName = "SaveButton";

//이게 뭘까
