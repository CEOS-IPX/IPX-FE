import CheckIcon from "@/components/icons/icon-check.svg";
import CheckedIcon from "@/components/icons/icon-check_filled.svg";
import { cn } from "@/lib/cn";

export const PROJECT_STEPS = ["구성요소 분해", "기술 분석", "분석 리포트"] as const;

export type ProjectStep = (typeof PROJECT_STEPS)[number];

type SelectableItemProps = {
  label: ProjectStep;
  completed: boolean;
  current: boolean;
};

type SelectableItemGroupProps = {
  currentStep: ProjectStep;
};

export function SelectableItem({ label, completed, current }: SelectableItemProps) {
  const Icon = completed ? CheckedIcon : CheckIcon;

  return (
    <li
      aria-current={current ? "step" : undefined}
      className={cn(
        "inline-flex items-center gap-0.5 text-body-emphasis-15",
        completed ? "text-primary-default" : "text-caption-label"
      )}
    >
      <Icon className="h-5 w-5 shrink-0 [&_path]:fill-current" aria-hidden />
      <span>{label}</span>
    </li>
  );
}

export function SelectableItemGroup({ currentStep }: SelectableItemGroupProps) {
  const currentStepIndex = PROJECT_STEPS.indexOf(currentStep);

  return (
    <ol className="flex items-center gap-3" aria-label="활동 기록 진행 단계">
      {PROJECT_STEPS.map((step, index) => (
        <SelectableItem
          key={step}
          label={step}
          completed={index <= currentStepIndex}
          current={index === currentStepIndex}
        />
      ))}
    </ol>
  );
}
