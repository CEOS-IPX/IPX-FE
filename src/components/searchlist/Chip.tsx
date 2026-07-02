import { forwardRef } from "react";
import { cva, type VariantProps } from "class-variance-authority";
import { cn } from "@/lib/cn";

const chipVariants = cva(
  "text-label-13 inline-flex items-center justify-center gap-1 rounded-full px-3 py-1",
  {
    variants: {
      variant: {
        primary:
          "text-label-13 bg-bg-primary-light text-primary-default border border-bg-primary-light",
        default: "text-label-13 bg-bg-surface text-body-secondary border border-outline-default",
      },
    },
    defaultVariants: { variant: "default" },
  }
);

export type ChipProps = React.HTMLAttributes<HTMLSpanElement> & VariantProps<typeof chipVariants>;

export const Chip = forwardRef<HTMLSpanElement, ChipProps>(
  ({ className, variant, ...props }, ref) => (
    <span ref={ref} className={cn(chipVariants({ variant }), className)} {...props} />
  )
);

Chip.displayName = "Chip";
