"use client";

import { usePathname } from "next/navigation";

const PAGE_LABELS: Record<string, string> = {
  "/myhistory": "내 활동 기록",
  "/search": "선행기술 탐색",
  "/analysis": "기술 분석",
};

export function Topbar() {
  const pathname = usePathname();
  const pageLabel = PAGE_LABELS[pathname] ?? "";

  return (
    <header className="flex flex-row h-16 shrink-0 items-center justify-between border-b border-outline-sub px-6 py-3">
      <span className="px-1.5 py-1 text-body-15 text-body-secondary">{pageLabel}</span>{" "}
      {/* api 연동 이후 뎁스 추가 예정 */}
      <div></div> {/* 프로필 영역 추가 예정 */}
    </header>
  );
}
