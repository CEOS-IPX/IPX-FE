"use client";

import { useState } from "react";
import CheckIcon from "@/components/icons/icon-check.svg";
import CheckedIcon from "@/components/icons/icon-check_filled.svg";
import { cn } from "@/lib/cn";

type SelectableItemProps = {
  label: string;
  active?: boolean;
  onClick?: () => void;
};

const PROJECT_STEPS = ["구성요소 분해", "기술 분석", "분석 리포트"];

export function SelectableItem({ label, active = false, onClick }: SelectableItemProps) {
  const Icon = active ? CheckedIcon : CheckIcon;

  return (
    <button
      type="button"
      aria-pressed={active}
      onClick={onClick}
      className={cn(
        "inline-flex cursor-pointer items-center gap-0.5 text-body-emphasis-15 focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-primary-default",
        active ? "text-primary-default" : "text-caption-label"
      )}
    >
      <Icon className="h-5 w-5 shrink-0 [&_path]:fill-current" aria-hidden />
      <span>{label}</span>
    </button>
  );
}

export function SelectableItemGroup() {
  const [selectedStep, setSelectedStep] = useState(0);

  return (
    <div className="flex items-center gap-3" aria-label="활동 기록 진행 단계">
      {PROJECT_STEPS.map((step, index) => (
        <SelectableItem
          key={step}
          label={step}
          active={selectedStep === index}
          onClick={() => setSelectedStep(index)}
        />
      ))}
    </div>
  );
}
