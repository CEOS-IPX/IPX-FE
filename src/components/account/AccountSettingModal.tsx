"use client";

import CancelIcon from "@/components/icons/icon-cancel.svg";
import { TextField } from "@/components/account/AccountTextField";

interface AccountSettingModalProps {
  name: string;
  email: string;
  company?: string;
  onClose: () => void;
  onSaveName?: (name: string) => void;
  onSaveCompany?: (company: string) => void;
  onEditAvatar?: () => void;
  onDeleteAccount?: () => void;
}

export function AccountSettingModal({
  name,
  email,
  company,
  onClose,
  onSaveName,
  onSaveCompany,
  onDeleteAccount,
}: AccountSettingModalProps) {
  const initial = name.trim().charAt(0);

  return (
    <div
      className="fixed inset-0 z-50 flex items-center justify-center bg-scrim-2"
      onClick={onClose}
    >
      <div
        className="w-129.5 flex flex-col gap-3 rounded-lg bg-bg-surface p-6 shadow-[0px_1px_6px_0px_rgba(144,155,165,0.36)]"
        onClick={(e) => e.stopPropagation()}
      >
        <div className="flex items-center justify-between mb-5">
          <h2 className="text-body-emphasis-17 text-title-primary">계정 관리</h2>

          <button
            type="button"
            onClick={onClose}
            aria-label="닫기"
            className="flex cursor-pointer items-center justify-center"
          >
            <CancelIcon
              className="h-6 w-6 text-icon-neutral-emphasize [&_path]:fill-current"
              aria-hidden
            />
          </button>
        </div>

        <div className="flex items-center gap-4 mb-5">
          <div className="flex shrink-0 h-12 w-12 items-center justify-center rounded-full bg-bg-profile text-title-emphasis-22 text-inverse-on-primary">
            {initial}
          </div>

          <div className="flex flex-col gap-0.5">
            <p className="text-title-emphasis-18 text-title-primary">{name}</p>
            <p className="text-body-17 text-caption-label">{email}</p>
          </div>
        </div>

        <div className="flex flex-col gap-4">
          <TextField label="이름" defaultValue={name} buttonLabel="수정" onSave={onSaveName} />

          <TextField label="이메일" defaultValue={email} disabled />

          <TextField
            label="회사명"
            defaultValue={company}
            placeholder="미입력"
            buttonLabel="입력"
            onSave={onSaveCompany}
          />
        </div>

        <button
          type="button"
          onClick={onDeleteAccount}
          className="w-fit cursor-pointer py-2 text-body-15 text-error-emphasized"
        >
          계정 삭제
        </button>
      </div>
    </div>
  );
}
