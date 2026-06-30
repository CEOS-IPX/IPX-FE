import { cn } from "@/lib/cn";

type RadioProps = Omit<React.InputHTMLAttributes<HTMLInputElement>, "type" | "size"> & {
  ref?: React.Ref<HTMLInputElement>;
};

export function Radio({ className, ref, ...props }: RadioProps) {
  return (
    <span className="relative inline-flex size-5 shrink-0 items-center justify-center">
      <input
        ref={ref}
        type="radio"
        className={cn(
          "peer size-5 cursor-pointer appearance-none rounded-full border border-outline-default bg-bg-neutral-subtle",
          className
        )}
        {...props}
      />
      <span
        aria-hidden
        className="pointer-events-none absolute size-3 rounded-full bg-bg-primary opacity-0 peer-checked:opacity-100"
      />
    </span>
  );
}
