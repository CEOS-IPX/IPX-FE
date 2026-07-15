import { forwardRef } from "react";
import { cva, type VariantProps } from "class-variance-authority";
import { cn } from "@/lib/cn";

const ReferenceChipVariants = cva(
  "w-14 shrink-0 whitespace-nowrap text-label-13 inline-flex items-center justify-center rounded-[2px] px-2 py-1",
  {
    variants: {
      variant: {
        primary: "text-label-13 bg-bg-primary text-inverse-on-primary",
        secondary: "text-label-13 bg-bg-neutral-strong text-body-disabled",
      },
    },
    defaultVariants: { variant: "primary" },
  }
);

export type ReferenceChipProps = React.HTMLAttributes<HTMLSpanElement> &
  VariantProps<typeof ReferenceChipVariants>;

export const ReferenceChip = forwardRef<HTMLSpanElement, ReferenceChipProps>(
  ({ className, variant, ...props }, ref) => (
    <span ref={ref} className={cn(ReferenceChipVariants({ variant }), className)} {...props} />
  )
);

ReferenceChip.displayName = "ReferenceChip";
