"use client";

import { useId, useState } from "react";
import EyeIcon from "@/components/icons/icon-eye.svg";
import EyeOffIcon from "@/components/icons/icon-eye_x.svg";
import { cn } from "@/lib/cn";

type PasswordFieldProps = Omit<React.InputHTMLAttributes<HTMLInputElement>, "type" | "size"> & {
  label: string;
  error?: string;
  ref?: React.Ref<HTMLInputElement>;
};

export function PasswordField({ label, error, className, id, ref, ...props }: PasswordFieldProps) {
  const autoId = useId();
  const inputId = id ?? autoId;
  const errorId = `${inputId}-error`;
  const [visible, setVisible] = useState(false);

  return (
    <div className="flex w-full flex-col items-start gap-1">
      <label htmlFor={inputId} className="flex h-5 items-center text-label-13 text-title-secondary">
        {label}
      </label>
      <div
        className={cn(
          "flex w-full items-center justify-between rounded-lg border border-outline-default bg-bg-surface p-4 focus-within:border-stroke-primary",
          error && "border-stroke-error focus-within:border-stroke-error"
        )}
      >
        <input
          ref={ref}
          id={inputId}
          type={visible ? "text" : "password"}
          aria-invalid={!!error}
          aria-describedby={error ? errorId : undefined}
          className={cn(
            "flex-1 bg-transparent text-body-17 text-body-primary placeholder:text-caption-label focus:outline-none",
            className
          )}
          {...props}
        />
        <button
          type="button"
          aria-label={visible ? "비밀번호 숨기기" : "비밀번호 보기"}
          onClick={() => setVisible((v) => !v)}
          className="ml-2 flex shrink-0 cursor-pointer items-center justify-center text-icon-neutral-subtle"
        >
          {visible ? <EyeIcon className="size-6" /> : <EyeOffIcon className="size-6" />}
        </button>
      </div>
      {error && (
        <p id={errorId} className="flex h-5 items-center text-label-13 text-error-default">
          {error}
        </p>
      )}
    </div>
  );
}
