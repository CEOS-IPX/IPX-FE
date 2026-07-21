import { forwardRef } from "react";
import { cva, type VariantProps } from "class-variance-authority";
import { cn } from "@/lib/cn";

const ProjectCardChipVariants = cva(
  "h-7 text-label-13 inline-flex items-center justify-center gap-1 rounded-full px-3 py-1",
  {
    variants: {
      variant: {
        primary: "text-label-13 bg-bg-primary-light text-primary-default",
        secondary: "text-label-13 bg-bg-neutral-subtle text-body-secondary",
      },
    },
    defaultVariants: { variant: "primary" },
  }
);

export type ProjectCardChipProps = React.HTMLAttributes<HTMLSpanElement> &
  VariantProps<typeof ProjectCardChipVariants>;

export const Chip = forwardRef<HTMLSpanElement, ProjectCardChipProps>(
  ({ className, variant, ...props }, ref) => (
    <span ref={ref} className={cn(ProjectCardChipVariants({ variant }), className)} {...props} />
  )
);

Chip.displayName = "Chip";
