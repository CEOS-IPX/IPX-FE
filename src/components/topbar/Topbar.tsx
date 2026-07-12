"use client";

import { useState } from "react";
import { usePathname } from "next/navigation";
import { UserProfileChip } from "@/components/account/UserProfileChip";
import { AccountSettingModal } from "@/components/account/AccountSettingModal";

const PAGE_LABELS: Record<string, string> = {
  "/myhistory": "내 활동 기록",
  "/search": "선행기술 탐색",
  "/analysis": "기술 분석",
};

// 추후 api 연동 시 교체 (로그인한 사용자 정보)
const MOCK_USER = {
  name: "김기획",
  email: "abcd@gmail.com",
};

export function Topbar() {
  const pathname = usePathname();
  const pageLabel = PAGE_LABELS[pathname] ?? "";
  const [isAccountModalOpen, setIsAccountModalOpen] = useState(false);

  return (
    <header className="flex flex-row h-16 shrink-0 items-center justify-between border-b border-outline-sub px-6 py-2">
      <span className="px-1.5 py-1 text-body-15 text-body-secondary">{pageLabel}</span>{" "}
      {/* api 연동 이후 뎁스 추가 예정 */}
      <UserProfileChip
        name={MOCK_USER.name}
        email={MOCK_USER.email}
        onAccountManage={() => setIsAccountModalOpen(true)}
      />
      {isAccountModalOpen && (
        <AccountSettingModal
          name={MOCK_USER.name}
          email={MOCK_USER.email}
          onClose={() => setIsAccountModalOpen(false)}
          // 추후 api 연동 시 실제 저장 요청으로 교체
          onSaveName={(name) => console.log("save name:", name)}
          onSaveCompany={(company) => console.log("save company:", company)}
        />
      )}
    </header>
  );
}
