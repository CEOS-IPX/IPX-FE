import { AIChip } from "./AIChip";
import { cn } from "@/lib/cn";
import CircleCheck from "@/components/icons/icon-check.svg";
import CircleCheckFilled from "@/components/icons/icon-check_filled.svg";

interface InventiveStepCardProps {
  title: string;
  description: string;
  aiRecommended: boolean;
  selected?: boolean;
  onClick?: () => void;
}

export function InventiveStepCard({
  title,
  description,
  aiRecommended,
  selected = false,
  onClick,
}: InventiveStepCardProps) {
  return (
    <div className="group relative min-w-0 flex-1">
      <button
        type="button"
        onClick={onClick}
        className={cn(
          "flex h-full w-full flex-col gap-0.5 rounded-md border px-4 py-3 text-left transition-colors bg-bg-surface",
          selected ? "border-stroke-primary" : "border-outline-sub hover:bg-bg-neutral-hover"
        )}
      >
        <div className="flex flex-row items-center justify-between mb-1">
          <div>
            {selected ? (
              <CircleCheckFilled className="h-6 w-6 text-icon-primary-emphasize [&_path]:fill-current" />
            ) : (
              <CircleCheck className="h-6 w-6 text-icon-neutral-subtle [&_path]:fill-current" />
            )}
          </div>

          <AIChip variant={!aiRecommended ? "none" : selected ? "selected" : "recommended"}>
            {aiRecommended ? "AI 추천" : "해당 없음"}
          </AIChip>
        </div>

        <p
          className={cn(
            "text-label-emphasis-17",
            selected ? "text-primary-default" : "text-body-primary"
          )}
        >
          {title}
        </p>

        <p className="text-label-13 text-caption-label">{description}</p>
      </button>
    </div>
  );
}
