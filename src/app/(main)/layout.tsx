"use client";

import { useState } from "react";
import { usePathname } from "next/navigation";
import IconViewSidebar from "@/components/icons/icon-view_sidebar.svg";
import IPXLogo from "@/components/icons/logo-ipx-char.svg";
import NewSearch from "@/components/icons/icon-create.svg";
import Search from "@/components/icons/icon-search.svg";
import MyProject from "@/components/icons/icon-folder.svg";
import { SidebarNavItem } from "@/components/sidebar/SidebarNavItem";
import { PreviousSearchItem } from "@/components/sidebar/PreviousSearchItem";

export default function MainLayout({ children }: { children: React.ReactNode }) {
  const [openSidebar, setOpenSidebar] = useState(true);
  const pathname = usePathname();

  const PAGE_LABELS: Record<string, string> = {
    "/search": "새로 탐색하기",
    "/project": "내 프로젝트",
    "/history": "탐색 내역 찾기",
  };

  const pageLabel = PAGE_LABELS[pathname] ?? "";

  return (
    <div className="flex h-screen w-full overflow-hidden">
      {/* 사이드바 */}
      <aside
        className={`flex flex-col gap-5 px-3 py-6 border-r border-gray-90 transition-all duration-500 ${
          openSidebar ? "w-72" : "w-15"
        }`}
      >
        <div
          className={`flex py-2 px-3 h-14 shrink-0 items-center ${openSidebar ? "justify-between" : "justify-center"}`}
        >
          {openSidebar && <IPXLogo width={57} height={20} />}
          <button
            className="ml-auto cursor-pointer text-gray-40"
            onClick={() => setOpenSidebar((prev) => !prev)}
          >
            <IconViewSidebar
              width={20}
              height={20}
              className={openSidebar ? "fill-gray-80" : "fill-gray-30"}
            />
          </button>
        </div>

        <nav className="flex flex-col gap-2 pb-5 border-b border-gray-100">
          <SidebarNavItem
            href="/search"
            icon={<NewSearch width={20} height={20} />}
            label="새로 탐색하기"
            open={openSidebar}
          />
          <SidebarNavItem
            href="#"
            icon={<MyProject width={20} height={20} />}
            label="내 프로젝트"
            open={openSidebar}
          />
          <SidebarNavItem
            href="#"
            icon={<Search width={20} height={20} />}
            label="탐색 내역 찾기"
            open={openSidebar}
          />
        </nav>

        {openSidebar && (
          <div className="flex flex-1 flex-col gap-1 overflow-y-auto">
            <span className="px-3 text-label-emphasis-13 text-gray-20">최근 탐색</span>
            <PreviousSearchItem href="#" label="니켈 회수율을 높일 수 있는 습식제련 기..." />
            <PreviousSearchItem href="#" label="니켈 회수율을 높일 수 있는 습식제련 기..." />
            <PreviousSearchItem href="#" label="니켈 회수율을 높일 수 있는 습식제련 기..." />
          </div> //이후 api 연동시 map 이용해서 무한 스크롤 형식으로 변경 예정(지금은 위 3개만 봐주세용..)
        )}
      </aside>

      {/* 사이드바를 제외한 영역 */}
      <div className="flex flex-1 flex-col overflow-hidden">
        {/* 탑바 */}
        <header className="flex flex-row h-16 shrink-0 items-center justify-between border-b border-gray-90 px-6 py-3">
          <span className="px-1.5 py-1 text-body-17 text-gray-30">{pageLabel}</span>{" "}
          {/* api 연동 이후 뎁스 추가 예정 */}
          <div></div> {/* 프로필 영역 추가 예정 */}
        </header>

        {/* 페이지별 내용 */}
        <main className="flex-1 overflow-auto">{children}</main>
      </div>
    </div>
  );
}
