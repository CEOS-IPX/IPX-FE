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

type TextAreaProps = React.TextareaHTMLAttributes<HTMLTextAreaElement> &
  VariantProps<typeof labelVariants> & {
    label: string;
    error?: string;
    ref?: React.Ref<HTMLTextAreaElement>;
  };

export function TextArea({ label, labelSize, error, className, id, ref, ...props }: TextAreaProps) {
  const autoId = useId();
  const textareaId = id ?? autoId;
  const errorId = `${textareaId}-error`;

  return (
    <div className="flex w-full flex-col items-start gap-1.5">
      <label htmlFor={textareaId} className={labelVariants({ labelSize })}>
        {label}
      </label>
      <textarea
        ref={ref}
        id={textareaId}
        aria-invalid={!!error}
        aria-describedby={error ? errorId : undefined}
        className={cn(
          "h-27.5 w-full resize-none rounded-lg border border-outline-default bg-bg-surface p-4 text-body-17 text-body-primary placeholder:text-caption-label focus:border-stroke-primary focus:outline-none",
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
