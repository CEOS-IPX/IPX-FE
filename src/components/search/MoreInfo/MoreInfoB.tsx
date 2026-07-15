"use client";

import { useState } from "react";
import { MoreInfoButton } from "./MoreInfoButton";
import { TextArea } from "@/components/ui/TextArea";

interface MoreInfoProps {
  label: string;
}

export function MoreInfoB({ label }: MoreInfoProps) {
  const [checked, setChecked] = useState(false);

  return (
    <div className="w-full">
      <MoreInfoButton label={label} checked={checked} onClick={() => setChecked((prev) => !prev)} />

      {checked && (
        <div className="flex flex-col gap-6 border-t border-stroke-divider mt-4 pt-4 pb-4">
          <TextArea
            labelSize={17}
            label="측정 조건 및 비교 대상"
            placeholder="어떤 지표를 어떤 조건에서 측정했는지 입력해주세요"
            className="h-40.5"
          />

          <TextArea
            labelSize={17}
            label="측정 결과 및 해석"
            placeholder="측정한 수치가 어떻게 나왔는지 입력해주세요"
            className="h-40.5"
          />
        </div>
      )}
    </div>
  );
}
