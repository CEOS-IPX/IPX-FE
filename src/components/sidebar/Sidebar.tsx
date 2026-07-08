"use client";

import { usePathname } from "next/navigation";
import IconViewSidebar from "@/components/icons/icon-view_sidebar.svg";
import IPXLogo from "@/components/logo/logo-ipx-char.svg";
import NewSearch from "@/components/icons/icon-create.svg";
import MyHistory from "@/components/icons/icon-group.svg";
import Search from "@/components/icons/icon-search.svg";
import { SidebarNavItem } from "@/components/sidebar/SidebarNavItem";
import { PreviousSearchItem } from "@/components/sidebar/PreviousSearchItem";

interface SidebarProps {
  open: boolean;
  onToggle: () => void;
}

export function Sidebar({ open, onToggle }: SidebarProps) {
  const pathname = usePathname();

  return (
    <aside
      className={`flex h-full flex-col gap-5 overflow-hidden border-r border-outline-sub py-5 transition-all duration-500 ${
        open ? "w-72 px-3" : "w-15 px-2" // 닫혔을 때 padding을 살짝 줄여주면 좁은 공간에서 밸런스가 더 좋습니다.
      }`}
    >
      <div className={`flex h-14 shrink-0 items-center py-2 ${open ? "px-3" : "justify-center"}`}>
        <div
          className={`overflow-hidden transition-all ${open ? "w-14.25 opacity-100 duration-500 delay-200" : "w-0 opacity-0 duration-500"}`}
        >
          <IPXLogo width={57} height={20} className="shrink-0" />
        </div>

        <button
          className={`cursor-pointer text-icon-neutral-default transition-transform duration-500 ${open ? "ml-auto" : ""}`}
          onClick={onToggle}
        >
          <IconViewSidebar width={20} height={20} className="fill-icon-neutral-default" />
        </button>
      </div>

      <nav className="flex flex-col gap-1 border-b border-stroke-divider pb-5">
        <SidebarNavItem
          href="/myhistory"
          icon={<MyHistory width={20} height={20} />}
          label="내 활동 기록"
          open={open}
          active={pathname === "/myhistory"}
        />
        <SidebarNavItem
          href="/search"
          icon={<Search width={20} height={20} />}
          label="선행기술 탐색"
          open={open}
          active={pathname === "/search"}
        />
        <SidebarNavItem
          href="/analysis"
          icon={<NewSearch width={20} height={20} />}
          label="기술 분석"
          open={open}
          active={pathname === "/analysis"}
        />
      </nav>

      <div
        className={`flex flex-1 flex-col gap-1.5 overflow-y-auto transition-opacity ${open ? "opacity-100 duration-300 delay-200" : "pointer-events-none opacity-0 duration-500"}`}
      >
        <span className="px-3 text-label-13 text-title-primary">최근 탐색</span>
        <PreviousSearchItem href="#" label="니켈 회수율을 높일 수 있는 습식제련 기..." />
        {/* ... */}
      </div>
    </aside>
  );
}
