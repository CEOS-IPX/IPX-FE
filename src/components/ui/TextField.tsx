import { useId } from "react";
import { cva, type VariantProps } from "class-variance-authority";
import { cn } from "@/lib/cn";

const labelVariants = cva("flex items-center text-title-secondary", {
  variants: {
    labelSize: {
      13: "h-5 text-label-13",
      15: "h-5 text-label-15",
      17: "h-6 text-label-17",
    },
  },
  defaultVariants: { labelSize: 13 },
});

const wrapperVariants = cva("flex w-full flex-col items-start", {
  variants: {
    gap: {
      1: "gap-1",
      1.5: "gap-1.5",
    },
  },
  defaultVariants: { gap: 1 },
});

type TextFieldProps = Omit<React.InputHTMLAttributes<HTMLInputElement>, "size"> &
  VariantProps<typeof labelVariants> &
  VariantProps<typeof wrapperVariants> & {
    label: string;
    error?: string;
    ref?: React.Ref<HTMLInputElement>;
  };

export function TextField({
  label,
  labelSize,
  gap,
  error,
  className,
  id,
  ref,
  ...props
}: TextFieldProps) {
  const autoId = useId();
  const inputId = id ?? autoId;
  const errorId = `${inputId}-error`;

  return (
    <div className={wrapperVariants({ gap })}>
      <label htmlFor={inputId} className={labelVariants({ labelSize })}>
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
