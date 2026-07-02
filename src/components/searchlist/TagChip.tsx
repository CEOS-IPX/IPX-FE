"use client";

import { forwardRef, useState } from "react";
import CancelIcon from "@/components/icons/icon-cancel.svg";
import HashIcon from "@/components/icons/icon-sharp.svg";
import { cva, type VariantProps } from "class-variance-authority";
import { cn } from "@/lib/cn";

const chipVariants = cva(
  "text-label-15 inline-flex items-center justify-center gap-1 rounded-[100px] px-3 py-1.5",
  {
    variants: {
      variant: {
        primary: "bg-bg-primary-light text-primary-default border border-bg-primary-light",
        default: "bg-bg-surface text-body-secondary border border-outline-default",
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

interface TagChipProps {
  label: string;
  onRemove?: (label: string) => void;
}

export function TagChip({ label, onRemove }: TagChipProps) {
  const [selected, setSelected] = useState(false);

  const handleClick = () => {
    if (!selected) setSelected(true);
  };

  const handleRemove = (e: React.MouseEvent) => {
    e.stopPropagation();
    setSelected(false);
    onRemove?.(label);
  };

  return (
    <Chip
      variant={selected ? "primary" : "default"}
      onClick={handleClick}
      className={selected ? undefined : "cursor-pointer"}
    >
      {selected && <HashIcon aria-hidden />}
      <span>{label}</span>
      {selected && (
        <button type="button" onClick={handleRemove} aria-label={`${label} 태그 삭제`}>
          <CancelIcon aria-hidden />
        </button>
      )}
    </Chip>
  );
}
