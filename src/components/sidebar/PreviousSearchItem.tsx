import Link from "next/link";
import { cva, type VariantProps } from "class-variance-authority";
import { cn } from "@/lib/cn";

const previousSearchItemVariants = cva(
  "flex w-full cursor-pointer items-center px-3 py-2 transition-colors",
  {
    variants: {
      active: {
        true: "rounded-lg bg-primary-120 text-primary-50",
        false: "text-gray-30 hover:rounded-lg hover:bg-gray-90 text-gray-20",
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
      {open && <span className="text-body-15">{label}</span>}
    </Link>
  );
}

PreviousSearchItem.displayName = "PreviousSearchItem";
