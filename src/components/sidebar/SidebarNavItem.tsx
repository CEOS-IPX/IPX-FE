import Link from "next/link";
import { cva, type VariantProps } from "class-variance-authority";
import { cn } from "@/lib/cn";

const sidebarNavItemVariants = cva(
  "flex w-full cursor-pointer items-center gap-2 px-3 py-2 transition-colors",
  {
    variants: {
      active: {
        true: "rounded-lg bg-primary-120 text-primary-50",
        false: "text-gray-20 hover:rounded-lg hover:bg-gray-90",
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
      <div className="flex shrink-0 items-center justify-center">{icon}</div>
      {open && <span className="text-label-15">{label}</span>}
    </Link>
  );
}

SidebarNavItem.displayName = "SidebarNavItem";
