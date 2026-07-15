import Link from "next/link";
import { cva, type VariantProps } from "class-variance-authority";
import { cn } from "@/lib/cn";

const sidebarNavItemVariants = cva(
  "flex w-full cursor-pointer items-center py-2 transition-colors", // gap-2와 px-3를 제거하여 아래에서 조건부로 제어합니다.
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
      className={cn(
        sidebarNavItemVariants({ active }),
        // 열렸을 땐 패딩과 간격을 주고, 닫혔을 땐 정중앙 배치
        open ? "px-3 gap-2 justify-start" : "px-0 justify-center",
        className
      )}
    >
      <div
        className={cn(
          "flex shrink-0 items-center justify-center transition-transform duration-500",
          active ? "text-icon-primary-default" : "text-body-primary"
          // 불필요한 translate-x 제거됨
        )}
      >
        {icon}
      </div>
      <span
        className={cn(
          "overflow-hidden whitespace-nowrap text-label-15 transition-[max-width,opacity]",
          active === true ? "text-primary-default" : "text-body-primary",
          open
            ? "max-w-40 opacity-100 duration-300 delay-200"
            : "max-w-0 pointer-events-none opacity-0 duration-500"
        )}
      >
        {label}
      </span>
    </Link>
  );
}

SidebarNavItem.displayName = "SidebarNavItem";
