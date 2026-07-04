import Link from "next/link";
import { cva, type VariantProps } from "class-variance-authority";
import { cn } from "@/lib/cn";

const previousSearchItemVariants = cva(
  "flex w-full cursor-pointer items-center px-3 py-2 transition-colors text-body-15",
  {
    variants: {
      active: {
        true: "rounded-lg bg-bg-primary-tint text-primary-default",
        false: "text-body-primary hover:rounded-lg hover:bg-bg-neutral-subtle",
      },
    },
    defaultVariants: { active: false },
  }
);

export type PreviousSearchItemProps = VariantProps<typeof previousSearchItemVariants> & {
  href: string;
  label: string;
  open?: boolean;
  className?: string;
};

export function PreviousSearchItem({
  href,
  label,
  active,
  open = true,
  className,
}: PreviousSearchItemProps) {
  return (
    <Link href={href} className={cn(previousSearchItemVariants({ active }), className)}>
      {open && (
        <span
          className={cn(
            "text-label-15 truncate",
            active === true ? "text-primary-default" : "text-body-primary"
          )}
        >
          {label}
        </span>
      )}
    </Link>
  );
}

PreviousSearchItem.displayName = "PreviousSearchItem";
