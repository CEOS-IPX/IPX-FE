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
      className={`flex flex-col gap-5 px-3 py-5 border-r border-outline-sub transition-all duration-500 ${
        open ? "w-72" : "w-15"
      }`}
    >
      <div
        className={`flex py-2 px-3 h-14 shrink-0 items-center ${open ? "justify-between" : "justify-center"}`}
      >
        {open && <IPXLogo width={57} height={20} />}
        <button className="ml-auto cursor-pointer text-icon-neutral-default" onClick={onToggle}>
          <IconViewSidebar
            width={20}
            height={20}
            className={open ? "fill-gray-80" : "fill-gray-30"}
          />
        </button>
      </div>

      <nav className="flex flex-col gap-1 pb-5 border-b border-stroke-divider">
        <SidebarNavItem
          href="/history"
          icon={<MyHistory width={20} height={20} />}
          label="내 활동 기록"
          open={open}
          active={pathname === "/history"}
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

      {open && (
        <div className="flex flex-1 flex-col gap-1.5 overflow-y-auto">
          <span className="px-3 text-label-13 text-title-primary">최근 탐색</span>
          <PreviousSearchItem href="#" label="니켈 회수율을 높일 수 있는 습식제련 기..." />
          <PreviousSearchItem href="#" label="니켈 회수율을 높일 수 있는 습식제련 기..." />
          <PreviousSearchItem href="#" label="니켈 회수율을 높일 수 있는 습식제련 기..." />
        </div> //이후 api 연동시 map 이용해서 무한 스크롤 형식으로 변경 예정(지금은 위 3개만 봐주세용..)
      )}
    </aside>
  );
}
