"use client";

import { forwardRef, useEffect, useImperativeHandle, useRef, useState } from "react";
import CheckIcon from "@/components/icons/icon-only-check.svg";
import MinusIcon from "@/components/icons/icon-minus.svg";
import { cn } from "@/lib/cn";

export type CheckboxProps = Omit<React.InputHTMLAttributes<HTMLInputElement>, "type"> & {
  indeterminate?: boolean;
};

export const Checkbox = forwardRef<HTMLInputElement, CheckboxProps>(
  (
    { checked, defaultChecked, indeterminate = false, onChange, className, disabled, ...props },
    ref
  ) => {
    const inputRef = useRef<HTMLInputElement>(null);
    useImperativeHandle(ref, () => inputRef.current as HTMLInputElement);

    const isControlled = checked !== undefined;
    const [internal, setInternal] = useState(!!defaultChecked);
    const isChecked = isControlled ? checked : internal;

    useEffect(() => {
      if (inputRef.current) inputRef.current.indeterminate = indeterminate;
    }, [indeterminate]);

    const isFilled = indeterminate || isChecked;

    return (
      <label
        className={cn(
          "inline-flex h-6 w-6 items-center justify-center",
          disabled ? "cursor-not-allowed" : "cursor-pointer",
          className
        )}
      >
        <input
          ref={inputRef}
          type="checkbox"
          checked={isControlled ? checked : undefined}
          defaultChecked={isControlled ? undefined : defaultChecked}
          disabled={disabled}
          onChange={(e) => {
            if (!isControlled) setInternal(e.target.checked);
            onChange?.(e);
          }}
          className="sr-only"
          {...props}
        />
        <span
          className={cn(
            "flex h-4 w-4 items-center justify-center rounded-[1px] border-2",
            isFilled
              ? "border-primary-default bg-primary-default"
              : "border-outline-selected bg-bg-surface"
          )}
        >
          {indeterminate ? (
            <MinusIcon width={10} height={2} />
          ) : isChecked ? (
            <CheckIcon width={12} height={10} />
          ) : null}
        </span>
      </label>
    );
  }
);

Checkbox.displayName = "Checkbox";
