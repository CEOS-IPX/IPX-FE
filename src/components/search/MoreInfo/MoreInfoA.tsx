"use client";

import { useState } from "react";
import { MoreInfoButton } from "./MoreInfoButton";
import { TextArea } from "@/components/ui/TextArea";

interface MoreInfoProps {
  label: string;
  priorArtReference: string;
  onChangePriorArtReference: (value: string) => void;
  differentiationNotes: string;
  onChangeDifferentiationNotes: (value: string) => void;
}

export function MoreInfoA({
  label,
  priorArtReference,
  onChangePriorArtReference,
  differentiationNotes,
  onChangeDifferentiationNotes,
}: MoreInfoProps) {
  const [checked, setChecked] = useState(false);

  return (
    <div className="w-full">
      <MoreInfoButton label={label} checked={checked} onClick={() => setChecked((prev) => !prev)} />

      {checked && (
        <div className="flex flex-col gap-6 border-t border-stroke-divider mt-4 pt-4 pb-4">
          <TextArea
            labelSize={17}
            label="선행기술"
            placeholder="어떤 유사 기술이 공개되어 있는지 입력해주세요"
            className="h-40.5"
            value={priorArtReference}
            onChange={(e) => onChangePriorArtReference(e.target.value)}
          />

          <TextArea
            labelSize={17}
            label="본 발명과의 차이점"
            placeholder="그 기술과 비교했을 때 무엇이 다른지 입력해주세요"
            className="h-40.5"
            value={differentiationNotes}
            onChange={(e) => onChangeDifferentiationNotes(e.target.value)}
          />
        </div>
      )}
    </div>
  );
}
