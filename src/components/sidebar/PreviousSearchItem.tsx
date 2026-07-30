import Link from "next/link";
import { cn } from "@/lib/cn";

export type PreviousSearchItemProps = {
  href: string;
  label: string;
  open?: boolean;
  className?: string;
};

export function PreviousSearchItem({
  href,
  label,
  open = true,
  className,
}: PreviousSearchItemProps) {
  return (
    <Link
      href={href}
      className={cn(
        "flex w-full cursor-pointer items-center px-3 py-2 text-body-15 text-body-primary transition-colors hover:rounded-lg hover:bg-bg-neutral-subtle",
        className
      )}
    >
      {open && <span className="text-label-15 truncate">{label}</span>}
    </Link>
  );
}

PreviousSearchItem.displayName = "PreviousSearchItem";
