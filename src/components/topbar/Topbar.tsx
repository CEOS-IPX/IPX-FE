"use client";

import { Suspense } from "react";
import { usePathname, useSearchParams } from "next/navigation";
import ChevronIcon from "@/components/icons/icon-back.svg";

const MOCK_SEARCH_TITLE = "니켈 회수율을 높일 수 있는 습식제련 기술";

const PAGE_LABELS: Record<string, string> = {
  "/history": "내 활동 기록",
  "/search": "선행기술 탐색",
  "/search/result": "선행기술 탐색",
  "/analysis": "기술 분석",
};

function TopbarLabel() {
  const pathname = usePathname();
  const searchParams = useSearchParams();
  const pageLabel = PAGE_LABELS[pathname] ?? "";
  const searchTitle =
    pathname === "/search/result" ? searchParams.get("title")?.trim() || MOCK_SEARCH_TITLE : null;

  return (
    <div className="flex min-w-0 items-center">
      <span className="shrink-0 px-1.5 py-1 text-body-15 text-body-secondary">{pageLabel}</span>
      {searchTitle && (
        <>
          <ChevronIcon
            className="h-5 w-5 shrink-0 text-icon-neutral-default [&_path]:fill-current"
            aria-hidden
          />
          <span className="truncate px-1.5 py-1 text-body-15 text-body-secondary">
            {searchTitle}
          </span>
        </>
      )}
    </div>
  );
}

export function Topbar() {
  return (
    <header className="flex h-16 shrink-0 flex-row items-center justify-between border-b border-outline-sub px-6 py-3">
      <Suspense fallback={null}>
        <TopbarLabel />
      </Suspense>
      <div></div> {/* 프로필 영역 추가 예정 */}
    </header>
  );
}
