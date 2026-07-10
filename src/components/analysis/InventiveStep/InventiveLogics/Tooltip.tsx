import { cn } from "@/lib/cn";

interface TooltipProps {
  text: string;
  className?: string;
}

export function Tooltip({ text, className }: TooltipProps) {
  return (
    <p
      className={cn(
        "w-fit whitespace-nowrap rounded-sm bg-bg-tooltip px-3 py-1.5 text-label-13 text-inverse-on-primary",
        className
      )}
    >
      {text}
    </p>
  );
}
