"use client";

import CheckboxCheckedIcon from "@/components/icons/icon-checkbox-checked.svg";
import CheckboxUncheckedIcon from "@/components/icons/icon-checkbox-unchecked.svg";
import ExpandIcon from "@/components/icons/icon-expand.svg";
import { cn } from "@/lib/cn";

interface MoreInfoButtonProps {
  label: string;
  checked: boolean;
  onClick?: () => void;
}

export function MoreInfoButton({ label, checked, onClick }: MoreInfoButtonProps) {
  return (
    <button
      type="button"
      onClick={onClick}
      aria-pressed={checked}
      className={cn(
        "flex items-center gap-2 rounded-sm p-1 transition-colors cursor-pointer",
        "hover:bg-bg-neutral-hover",
        "active:bg-bg-primary-tint"
      )}
    >
      {checked ? (
        <CheckboxCheckedIcon className="h-6.5 w-6.5 shrink-0" />
      ) : (
        <CheckboxUncheckedIcon className="h-6.5 w-6.5 shrink-0" />
      )}

      <span className="text-body-19 text-title-secondary">{label}</span>

      <ExpandIcon
        className={cn(
          "ml-auto h-6 w-6 shrink-0 text-icon-neutral-emphasize transition-transform [&_path]:fill-current",
          checked && "rotate-180"
        )}
        aria-hidden
      />
    </button>
  );
}
