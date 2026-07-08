"use client";

import { useState } from "react";
import { Checkbox } from "@/components/searchlist/Checkbox";

const ITEMS = ["미공개 기술", "관련 수치데이터 보유", "누락 정보 없음"] as const;

export function Checklist() {
  const [checked, setChecked] = useState<Record<string, boolean>>({});

  return (
    <div className="flex items-center gap-8 pl-10">
      {ITEMS.map((label, index) => {
        const uniqueId = `checklist-${index}`;

        return (
          <div key={label} className="flex items-center gap-1">
            <Checkbox
              id={uniqueId}
              checked={!!checked[label]}
              onChange={(e) => setChecked((prev) => ({ ...prev, [label]: e.target.checked }))}
            />

            <label htmlFor={uniqueId} className="cursor-pointer text-body-15 text-title-secondary">
              {label}
            </label>
          </div>
        );
      })}
    </div>
  );
}
