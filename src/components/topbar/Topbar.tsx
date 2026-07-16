"use client";

import { useState } from "react";
import { usePathname, useRouter } from "next/navigation";
import { UserProfileChip } from "@/components/account/UserProfileChip";
import { AccountSettingModal } from "@/components/account/AccountSettingModal";
import { useAuthStore } from "@/store/authStore";
import { logout } from "@/lib/api/auth";

const PAGE_LABELS: Record<string, string> = {
  "/myhistory": "내 활동 기록",
  "/search": "선행기술 탐색",
  "/analysis": "기술 분석",
};

export function Topbar() {
  const pathname = usePathname();
  const router = useRouter();
  const pageLabel = PAGE_LABELS[pathname] ?? "";
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
    <header className="flex flex-row h-16 shrink-0 items-center justify-between border-b border-outline-sub px-6 py-2">
      <span className="px-1.5 py-1 text-body-15 text-body-secondary">{pageLabel}</span>{" "}
      {/* api 연동 이후 뎁스 추가 예정 */}
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
