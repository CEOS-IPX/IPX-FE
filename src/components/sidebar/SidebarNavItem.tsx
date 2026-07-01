import Link from "next/link";
import { cva, type VariantProps } from "class-variance-authority";
import { cn } from "@/lib/cn";

const sidebarNavItemVariants = cva(
  "flex w-full cursor-pointer items-center gap-2 px-3 py-2 transition-colors",
  {
    variants: {
      active: {
        true: "rounded-lg bg-bg-primary-tint text-primary-default text-body-15",
        false: "text-body-primary text-body-15 hover:rounded-lg hover:bg-bg-neutral-subtle",
      },
    },
    defaultVariants: { active: false },
  }
);

export type SidebarNavItemProps = VariantProps<typeof sidebarNavItemVariants> & {
  href: string;
  icon: React.ReactNode;
  label: string;
  open?: boolean;
  className?: string;
};

export function SidebarNavItem({
  href,
  icon,
  label,
  active,
  open = true,
  className,
}: SidebarNavItemProps) {
  return (
    <Link
      href={href}
      className={cn(sidebarNavItemVariants({ active }), !open && "justify-center", className)}
    >
      <div
        className={cn(
          "flex shrink-0 items-center justify-center",
          active ? "text-primary-default" : "text-body-primary"
        )}
      >
        {icon}
      </div>
      {open && (
        <span
          className={cn(
            "text-label-15",
            active === true ? "text-primary-default" : "text-body-primary"
          )}
        >
          {label}
        </span>
      )}
    </Link>
  );
}

SidebarNavItem.displayName = "SidebarNavItem";
