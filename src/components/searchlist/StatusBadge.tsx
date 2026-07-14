import { forwardRef } from "react";
import { cva, type VariantProps } from "class-variance-authority";
import { cn } from "@/lib/cn";

const statusBadgeVariants = cva(
  "inline-flex items-center justify-center gap-2.5 rounded-[0.125rem] px-2 py-0.5 text-center text-label-15",
  {
    variants: {
      variant: {
        verygood: "bg-bg-semantic-1 text-[#00A753]",
        good: "bg-bg-semantic-2 text-[#63C500]",
        related: "bg-bg-semantic-3 text-[#FF9F18]",
        bad: "bg-bg-semantic-4 text-[#E7453E]",
        hold: "bg-bg-semantic-5 text-[#909BA6]",
      },
    },
    defaultVariants: { variant: "verygood" },
  }
);

export type StatusBadgeProps = React.HTMLAttributes<HTMLSpanElement> &
  VariantProps<typeof statusBadgeVariants>;

export const StatusBadge = forwardRef<HTMLSpanElement, StatusBadgeProps>(
  ({ className, variant, ...props }, ref) => (
    <span ref={ref} className={cn(statusBadgeVariants({ variant }), className)} {...props} />
  )
);

StatusBadge.displayName = "StatusBadge";
