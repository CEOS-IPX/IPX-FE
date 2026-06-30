import { forwardRef } from "react";
import { cva, type VariantProps } from "class-variance-authority";
import { cn } from "@/lib/cn";

const buttonVariants = cva(
  "flex w-full cursor-pointer items-center justify-center gap-2.5 rounded-lg py-4 text-label-17 transition-colors disabled:cursor-not-allowed",
  {
    variants: {
      variant: {
        primary:
          "bg-bg-primary text-inverse-on-primary hover:bg-bg-primary-hover active:bg-bg-primary-pressed disabled:bg-bg-neutral-strong disabled:text-caption-label",
        secondary:
          "border border-outline-default bg-bg-surface text-title-secondary hover:bg-bg-neutral-hover active:bg-bg-neutral-subtle disabled:border-bg-neutral-strong disabled:bg-bg-neutral-strong disabled:text-caption-label",
      },
    },
    defaultVariants: { variant: "primary" },
  }
);

export type ButtonProps = React.ButtonHTMLAttributes<HTMLButtonElement> &
  VariantProps<typeof buttonVariants>;

export const Button = forwardRef<HTMLButtonElement, ButtonProps>(
  ({ className, variant, type = "button", ...props }, ref) => (
    <button
      ref={ref}
      type={type}
      className={cn(buttonVariants({ variant }), className)}
      {...props}
    />
  )
);

Button.displayName = "Button";
