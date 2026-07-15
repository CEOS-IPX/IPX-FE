"use client";

import { useId, useState } from "react";
import { cva, type VariantProps } from "class-variance-authority";
import { cn } from "@/lib/cn";

const labelVariants = cva("flex items-center text-title-secondary");

const wrapperVariants = cva("flex w-full flex-col items-start");

type TextFieldProps = Omit<React.InputHTMLAttributes<HTMLInputElement>, "size"> &
  VariantProps<typeof labelVariants> &
  VariantProps<typeof wrapperVariants> & {
    label: string;
    error?: string;
    ref?: React.Ref<HTMLInputElement>;
    buttonLabel?: string;
    onButtonClick?: () => void;
    onSave?: (value: string) => void;
  };

export function TextField({
  label,
  className,
  id,
  ref,
  buttonLabel,
  onButtonClick,
  onSave,
  defaultValue,
  placeholder,
  ...props
}: TextFieldProps) {
  const autoId = useId();
  const inputId = id ?? autoId;
  const [isEditing, setIsEditing] = useState(false);
  const [value, setValue] = useState(defaultValue ?? "");

  const handleButtonClick = () => {
    const nextIsEditing = !isEditing;
    setIsEditing(nextIsEditing);
    onButtonClick?.();

    if (!nextIsEditing) {
      onSave?.(String(value));
    }
  };

  return (
    <div className="flex flex-col gap-1">
      <label htmlFor={inputId} className="text-label-13 text-caption-label">
        {label}
      </label>

      <div className="flex w-full items-center justify-between pt-1 pb-3 border-b border-b-stroke-divider">
        {isEditing ? (
          <input
            ref={ref}
            id={inputId}
            value={value}
            onChange={(e) => setValue(e.target.value)}
            placeholder={placeholder}
            autoFocus
            className={cn(
              "w-full text-body-17 text-body-primary placeholder:text-caption-label outline-none",
              className
            )}
            {...props}
          />
        ) : (
          <p className="w-full py-1 text-body-17 text-body-primary">{value || placeholder}</p>
        )}

        {buttonLabel && (
          <button
            type="button"
            onClick={handleButtonClick}
            className="shrink-0 cursor-pointer text-body-emphasis-15 text-primary-default hover:underline"
          >
            {isEditing ? "완료" : buttonLabel}
          </button>
        )}
      </div>
    </div>
  );
}
