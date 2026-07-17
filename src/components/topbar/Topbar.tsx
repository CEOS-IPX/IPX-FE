"use client";

import { Suspense, useState } from "react";
import { usePathname, useRouter, useSearchParams } from "next/navigation";
import { UserProfileChip } from "@/components/account/UserProfileChip";
import { AccountSettingModal } from "@/components/account/AccountSettingModal";
import ChevronIcon from "@/components/icons/icon-back.svg";
import { useAuthStore } from "@/store/authStore";
import { logout } from "@/lib/api/auth";

const MOCK_SEARCH_TITLE = "니켈 회수율을 높일 수 있는 습식제련 기술";

const PAGE_LABELS: Record<string, string> = {
  "/myhistory": "내 활동 기록",
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
  const router = useRouter();
  const [isAccountModalOpen, setIsAccountModalOpen] = useState(false);
  const user = useAuthStore((s) => s.user);
  const clearAuth = useAuthStore((s) => s.clearAuth);

  const handleLogout = async () => {
    try {
      await logout();
    } catch {
    } finally {
      clearAuth();
      router.replace("/login");
    }
  };

  return (
    <header className="flex h-16 shrink-0 flex-row items-center justify-between border-b border-outline-sub px-6 py-2">
      <Suspense fallback={null}>
        <TopbarLabel />
      </Suspense>

      {user && (
        <>
          <UserProfileChip
            name={user.name}
            email={user.email}
            onAccountManage={() => setIsAccountModalOpen(true)}
            onLogout={handleLogout}
          />
          {isAccountModalOpen && (
            <AccountSettingModal
              name={user.name}
              email={user.email}
              company={user.company}
              onClose={() => setIsAccountModalOpen(false)}
              // 추후 api 연동 시 실제 저장 요청으로 교체
              onSaveName={(name) => console.log("save name:", name)}
              onSaveCompany={(company) => console.log("save company:", company)}
            />
          )}
        </>
      )}
    </header>
  );
}
