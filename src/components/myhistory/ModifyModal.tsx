"use client";

import { useState } from "react";
import CancelIcon from "@/components/icons/icon-cancel.svg";
import { TextField } from "@/components/ui/TextField";
import { Button } from "@/components/ui/Button";

interface ModifyModalProps {
  initialTitle: string;
  initialCompany?: string;
  initialManager?: string;
  onClose: () => void;
  onSubmit: (data: { title: string; company: string; manager: string }) => void;
}

export function ModifyModal({
  initialTitle,
  initialCompany = "",
  initialManager = "",
  onClose,
  onSubmit,
}: ModifyModalProps) {
  const [title, setTitle] = useState(initialTitle);
  const [company, setCompany] = useState(initialCompany);
  const [manager, setManager] = useState(initialManager);

  return (
    <div
      className="fixed inset-0 z-50 flex items-center justify-center bg-scrim-2"
      onClick={onClose}
    >
      <div
        className="w-138.5 p-6 flex flex-col gap-8 rounded-lg bg-bg-surface shadow-[0px_1px_6px_0px_rgba(144,155,165,0.36)]"
        onClick={(e) => e.stopPropagation()}
      >
        <div className="flex items-center justify-between">
          <h2 className="text-title-emphasis-17 text-title-primary">수정하기</h2>
          <button
            type="button"
            onClick={onClose}
            aria-label="닫기"
            className="flex items-center justify-center cursor-pointer"
          >
            <CancelIcon className="h-6 w-6" aria-hidden />
          </button>
        </div>

        <div className="flex flex-col gap-4">
          <TextField label="이름" value={title} onChange={(e) => setTitle(e.target.value)} />

          <div className="flex gap-3">
            <TextField
              label="사명 (선택)"
              value={company}
              onChange={(e) => setCompany(e.target.value)}
              placeholder="EX) 그린폴리머(주)"
            />
            <TextField
              label="의뢰인 (선택)"
              value={manager}
              onChange={(e) => setManager(e.target.value)}
              placeholder="담당자 또는 발명자 성명"
            />
          </div>
        </div>

        <Button onClick={() => onSubmit({ title, company, manager })}>변경</Button>
      </div>
    </div>
  );
}
