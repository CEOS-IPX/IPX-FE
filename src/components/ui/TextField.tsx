import { useId } from "react";
import { cn } from "@/lib/cn";

type TextFieldProps = Omit<React.InputHTMLAttributes<HTMLInputElement>, "size"> & {
  label: string;
  error?: string;
  ref?: React.Ref<HTMLInputElement>;
};

export function TextField({ label, error, className, id, ref, ...props }: TextFieldProps) {
  const autoId = useId();
  const inputId = id ?? autoId;
  const errorId = `${inputId}-error`;

  return (
    <div className="flex w-full flex-col items-start gap-1">
      <label htmlFor={inputId} className="flex h-5 items-center text-label-13 text-title-secondary">
        {label}
      </label>
      <input
        ref={ref}
        id={inputId}
        aria-invalid={!!error}
        aria-describedby={error ? errorId : undefined}
        className={cn(
          "w-full rounded-lg border border-outline-default bg-bg-surface p-4 text-body-17 text-body-primary placeholder:text-caption-label focus:border-stroke-primary focus:outline-none",
          error && "border-stroke-error focus:border-stroke-error",
          className
        )}
        {...props}
      />
      {error && (
        <p id={errorId} className="flex h-5 items-center text-label-13 text-error-default">
          {error}
        </p>
      )}
    </div>
  );
}
