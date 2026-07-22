"use client";

import { useState } from "react";
import CancelIcon from "@/components/icons/icon-cancel.svg";
import { TextField } from "@/components/ui/TextField";
import { Button } from "@/components/ui/Button";

interface PatentImportModalProps {
  initialPatentNumber: string;
  onClose: () => void;
  onSubmit: (data: { patentNumber: string }) => void;
  error?: string | null;
  isSubmitting?: boolean;
}

export function PatentImportModal({
  onClose,
  onSubmit,
  error,
  isSubmitting,
}: PatentImportModalProps) {
  const [patentNumber, setPatentNumber] = useState("");

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
          <h2 className="text-title-emphasis-17 text-title-primary">특허번호로 기술 불러오기</h2>
          <button
            type="button"
            onClick={onClose}
            aria-label="닫기"
            className="flex items-center justify-center cursor-pointer"
          >
            <CancelIcon className="h-6 w-6" aria-hidden />
          </button>
        </div>

        <TextField
          label="특허번호"
          value={patentNumber}
          onChange={(e) => setPatentNumber(e.target.value)}
          placeholder="특허번호를 입력해주세요"
        />

        {error && <p className="text-label-13 text-error-default">{error}</p>}

        <Button onClick={() => onSubmit({ patentNumber })} disabled={isSubmitting}>
          기술 불러오기
        </Button>
      </div>
    </div>
  );
}
