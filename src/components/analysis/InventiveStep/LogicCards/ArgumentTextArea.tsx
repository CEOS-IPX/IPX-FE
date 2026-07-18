"use client";

import { useId } from "react";
import { cn } from "@/lib/cn";

interface ArgumentTextAreaProps {
  label: string;
  value: string;
  onChange: (value: string) => void;
  placeholder: string;
  isEditing: boolean;
  className?: string;
}

export function ArgumentTextArea({
  label,
  value,
  onChange,
  placeholder,
  isEditing,
  className,
}: ArgumentTextAreaProps) {
  const textareaId = useId();

  return (
    <div className="flex w-full flex-col items-start gap-2">
      <label
        htmlFor={textareaId}
        className={
          cn("flex items-center", isEditing ? "text-body-primary" : "text-title-primary") +
          ` ${isEditing ? "text-label-15" : "text-title-emphasis-20"}`
        }
      >
        {label}
      </label>

      {isEditing ? (
        <textarea
          id={textareaId}
          value={value}
          onChange={(e) => onChange(e.target.value)}
          placeholder={placeholder}
          className={cn(
            "w-full resize-none scrollbar-hide rounded-md border border-outline-default bg-bg-surface p-4 text-body-15 text-body-primary placeholder:text-caption-label outline-none",
            className
          )}
        />
      ) : (
        <p className="w-full text-body-17 text-body-primary">{value}</p>
      )}
    </div>
  );
}
