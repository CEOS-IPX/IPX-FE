"use client";

import { useRouter } from "next/navigation";
import SettingIcon from "@/components/icons/icon-setting.svg";
import LockIcon from "@/components/icons/icon-lock.svg";
import LogoutIcon from "@/components/icons/icon-logout.svg";
import CloseIcon from "@/components/icons/icon-cancel.svg";

interface ProfileMenuProps {
  name: string;
  email: string;
  onAccountManage?: () => void;
  onChangePassword?: () => void;
  onLogout?: () => void;
}

export function ProfileMenu({
  name,
  email,
  onAccountManage,
  onChangePassword,
  onLogout,
}: ProfileMenuProps) {
  const initial = name.trim().charAt(0);
  const router = useRouter();

  return (
    <div className="w-50 flex flex-col gap-2 py-2 px-3 rounded-lg border border-outline-sub bg-bg-surface shadow-lg">
      <div className="flex items-center pt-2 pb-4 border-b border-b-stroke-divider gap-2">
        <span className="flex h-9 w-9 shrink-0 items-center justify-center rounded-full bg-bg-profile text-label-emphasis-17 text-inverse-on-primary">
          {initial}
        </span>

        <div className="flex flex-col">
          <p className="text-label-15 text-title-primary">{name}</p>
          <p className="text-label-13 text-caption-label">{email}</p>
        </div>
      </div>

      <div className="flex flex-col">
        <button
          type="button"
          onClick={onAccountManage}
          className="flex cursor-pointer items-center gap-2 py-2.5 text-left text-label-15 text-body-secondary transition-colors hover:bg-bg-neutral-hover active:bg-bg-neutral-subtle"
        >
          <SettingIcon
            className="h-5 w-5 text-icon-neutral-default [&_path]:fill-current"
            aria-hidden
          />
          계정 관리
        </button>

        <button
          type="button"
          onClick={() => {
            onChangePassword?.();
            router.push("/reset-password");
          }}
          className="flex cursor-pointer items-center gap-2 py-2.5 text-left text-label-15 text-body-secondary transition-colors hover:bg-bg-neutral-hover active:bg-bg-neutral-subtle"
        >
          <LockIcon
            className="h-5 w-5 text-icon-neutral-default [&_path]:fill-current"
            aria-hidden
          />
          비밀번호 변경
        </button>

        <button
          type="button"
          onClick={onLogout}
          className="flex cursor-pointer items-center gap-2 py-2.5 text-left text-label-15 text-body-secondary transition-colors hover:bg-bg-neutral-hover active:bg-bg-neutral-subtle"
        >
          <LogoutIcon
            className="h-5 w-5 text-icon-neutral-default [&_path]:fill-current"
            aria-hidden
          />
          로그아웃
        </button>
      </div>
    </div>
  );
}
