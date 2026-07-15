"use client";

import { forwardRef, useEffect, useRef, useState } from "react";
import ExpandIcon from "@/components/icons/icon-expand.svg";
import { cn } from "@/lib/cn";

export type SortingTagProps = Omit<React.ButtonHTMLAttributes<HTMLButtonElement>, "onChange"> & {
  label: string;
  options?: string[];
  onChange?: (value: string) => void;
};

export const SortingTag = forwardRef<HTMLButtonElement, SortingTagProps>(
  (
    {
      label,
      options = ["적합도 순", "최신순"],
      onChange,
      onClick,
      className,
      type = "button",
      disabled,
      ...props
    },
    ref
  ) => {
    const [open, setOpen] = useState(false);
    const [selected, setSelected] = useState(label);
    const containerRef = useRef<HTMLDivElement>(null);

    useEffect(() => {
      const handlePointerDown = (event: PointerEvent) => {
        if (!containerRef.current?.contains(event.target as Node)) {
          setOpen(false);
        }
      };

      document.addEventListener("pointerdown", handlePointerDown);
      return () => document.removeEventListener("pointerdown", handlePointerDown);
    }, []);

    const handleSelect = (option: string) => {
      setSelected(option);
      setOpen(false);
      onChange?.(option);
    };

    return (
      <div ref={containerRef} className="relative inline-flex">
        <button
          ref={ref}
          type={type}
          disabled={disabled}
          aria-haspopup="listbox"
          aria-expanded={open}
          className={cn(
            "inline-flex cursor-pointer items-center justify-center rounded-[0.375rem] border border-outline-default bg-bg-surface py-2 pr-2 pl-4 text-label-15",
            open ? "text-primary-default" : "text-body-secondary",
            disabled && "cursor-not-allowed",
            className
          )}
          onClick={(event) => {
            setOpen((current) => !current);
            onClick?.(event);
          }}
          {...props}
        >
          {selected}
          <ExpandIcon
            className={cn(
              "h-5 w-5 transition-transform [&_path]:fill-current",
              open ? "rotate-180 text-primary-default" : "text-icon-neutral-default"
            )}
            aria-hidden
          />
        </button>

        {open && (
          <div
            role="listbox"
            aria-label="정렬 방식"
            className="absolute top-[calc(100%+0.5rem)] left-0 z-10 flex w-[9.75rem] flex-col items-start justify-center rounded-[0.375rem] bg-bg-surface shadow-[0_1px_6px_0_rgba(144,155,165,0.36)]"
          >
            {options.map((option) => {
              const active = option === selected;

              return (
                <button
                  key={option}
                  type="button"
                  role="option"
                  aria-selected={active}
                  className={cn(
                    "flex w-full cursor-pointer items-center gap-2 rounded-[0.25rem] px-3 py-2.5 text-left text-label-15 hover:bg-bg-neutral-hover",
                    active ? "text-primary-default" : "text-body-secondary"
                  )}
                  onClick={() => handleSelect(option)}
                >
                  {option}
                </button>
              );
            })}
          </div>
        )}
      </div>
    );
  }
);

SortingTag.displayName = "SortingTag";
