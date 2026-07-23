import { forwardRef } from "react";
import { cva, type VariantProps } from "class-variance-authority";
import { cn } from "@/lib/cn";

const tagChipVariants = cva(
  "inline-flex shrink-0 items-center justify-center gap-0.5 whitespace-nowrap rounded-[6.25rem] px-3 py-1.5 text-label-15",
  {
    variants: {
      variant: {
        default: "bg-bg-neutral-subtle text-body-secondary",
        primary: "bg-bg-primary-light text-primary-default",
      },
    },
    defaultVariants: {
      variant: "default",
    },
  }
);

export type ChipProps = React.HTMLAttributes<HTMLSpanElement> &
  VariantProps<typeof tagChipVariants>;

export const Chip = forwardRef<HTMLSpanElement, ChipProps>(
  ({ className, variant, ...props }, ref) => (
    <span ref={ref} className={cn(tagChipVariants({ variant }), className)} {...props} />
  )
);

Chip.displayName = "Chip";

export type TagChipProps = Omit<ChipProps, "children" | "variant"> & {
  label: string;
  active?: boolean;
};

export function TagChip({ label, active = false, ...props }: TagChipProps) {
  return (
    <Chip variant={active ? "primary" : "default"} {...props}>
      <span aria-hidden>#</span>
      <span>{label}</span>
    </Chip>
  );
}
