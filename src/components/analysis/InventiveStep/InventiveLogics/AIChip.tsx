import { forwardRef } from "react";
import { cva, type VariantProps } from "class-variance-authority";
import { cn } from "@/lib/cn";

const AIChipVariants = cva(
  "shrink-0 whitespace-nowrap text-label-13 inline-flex items-center justify-center gap-1 rounded-full px-3 py-1",
  {
    variants: {
      variant: {
        recommended: "bg-bg-primary-light text-primary-default",
        selected: "bg-bg-primary text-inverse-on-primary",
        none: "bg-bg-neutral-subtle text-caption-label",
      },
    },
    defaultVariants: { variant: "recommended" },
  }
);

export type AIChipProps = React.HTMLAttributes<HTMLSpanElement> &
  VariantProps<typeof AIChipVariants>;

export const AIChip = forwardRef<HTMLSpanElement, AIChipProps>(
  ({ className, variant, ...props }, ref) => (
    <span ref={ref} className={cn(AIChipVariants({ variant }), className)} {...props} />
  )
);

AIChip.displayName = "AIChip";
