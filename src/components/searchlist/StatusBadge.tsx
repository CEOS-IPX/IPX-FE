import { forwardRef } from "react";
import { cva, type VariantProps } from "class-variance-authority";
import { cn } from "@/lib/cn";

const statusBadgeVariants = cva(
  "text-label-emphasis-15 inline-flex items-center justify-center rounded-[2px] py-0.5 text-center",
  {
    variants: {
      variant: {
        verygood: "bg-[#03BF61]/10 text-[#11B161] px-1.5",
        good: "bg-[#6CD800]/10 text-[#63C401] px-1.5",
        related: "bg-[#FFB618]/10 text-[#FF9F18] px-1.5",
        bad: "bg-[#E7453E]/10 text-[#FF817C] px-1.5",
        hold: "bg-[#909BA6]/10 text-[#909BA6] px-2",
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

//디자인 시스템 수정되면 다시 수정해야 함
