import { AIChip } from "./AIChip";
import { Tooltip } from "./Tooltip";
import { cn } from "@/lib/cn";

interface InventiveStepCardProps {
  title: string;
  description: string;
  aiRecommended: boolean;
  selected?: boolean;
  onClick?: () => void;
  tooltipText?: string;
}

export function InventiveStepCard({
  title,
  description,
  aiRecommended,
  selected = false,
  onClick,
  tooltipText,
}: InventiveStepCardProps) {
  return (
    <div className="group relative min-w-0 flex-1">
      <button
        type="button"
        onClick={onClick}
        className={cn(
          "flex w-full flex-col gap-1 rounded-md border p-4 text-left transition-colors",
          selected
            ? "border-outline-primary bg-bg-primary-tint"
            : "border-outline-sub bg-bg-surface hover:bg-bg-neutral-hover"
        )}
      >
        <div className="flex flex-row items-center justify-between">
          <p
            className={cn(
              "text-label-emphasis-17",
              selected ? "text-primary-default" : "text-body-primary"
            )}
          >
            {title}
          </p>

          <div className="relative">
            <AIChip variant={!aiRecommended ? "none" : selected ? "selected" : "recommended"}>
              {aiRecommended ? "AI 추천" : "해당 없음"}
            </AIChip>

            {tooltipText && (
              <div className="pointer-events-none absolute right-0 top-full z-10 translate-y-1 pt-2 opacity-0 transition-all duration-150 ease-out group-hover:translate-y-0 group-hover:opacity-100">
                <Tooltip text={tooltipText} className="shadow-lg" />
              </div>
            )}
          </div>
        </div>

        <p className="text-label-13 text-caption-label">{description}</p>
      </button>
    </div>
  );
}
