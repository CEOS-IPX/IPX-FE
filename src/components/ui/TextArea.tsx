import { useId } from "react";
import { cn } from "@/lib/cn";

type TextAreaProps = React.TextareaHTMLAttributes<HTMLTextAreaElement> & {
  label: string;
  error?: string;
  ref?: React.Ref<HTMLTextAreaElement>;
};

export function TextArea({ label, error, className, id, ref, ...props }: TextAreaProps) {
  const autoId = useId();
  const textareaId = id ?? autoId;
  const errorId = `${textareaId}-error`;

  return (
    <div className="flex w-full flex-col items-start gap-1">
      <label
        htmlFor={textareaId}
        className="flex h-5 items-center text-label-13 text-title-secondary"
      >
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
