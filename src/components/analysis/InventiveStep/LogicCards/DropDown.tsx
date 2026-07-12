"use client";

import { useEffect, useRef, useState } from "react";
import ExpandIcon from "@/components/icons/icon-expand.svg";
import { cn } from "@/lib/cn";

export interface DropDownOption {
  id: string;
  label: string;
}

interface DropDownProps {
  label: string;
  options: DropDownOption[];
  value: string | null;
  onChange: (id: string) => void;
  placeholder?: string;
  className?: string;
}

function optionLabel(option: DropDownOption, index: number) {
  return `${String.fromCharCode(65 + index)}. ${option.label}`;
}

export function DropDown({
  label,
  options,
  value,
  onChange,
  placeholder,
  className,
}: DropDownProps) {
  const [isOpen, setIsOpen] = useState(false);
  const containerRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    function handleClickOutside(e: MouseEvent) {
      if (containerRef.current && !containerRef.current.contains(e.target as Node)) {
        setIsOpen(false);
      }
    }

    document.addEventListener("mousedown", handleClickOutside);
    return () => document.removeEventListener("mousedown", handleClickOutside);
  }, []);

  const selectedIndex = options.findIndex((option) => option.id === value);
  const selectedOption = selectedIndex === -1 ? null : options[selectedIndex];

  return (
    <div ref={containerRef} className={cn("relative flex w-full flex-col gap-1.5", className)}>
      <label className="flex h-5 items-center text-label-15 text-body-primary">{label}</label>

      <button
        type="button"
        onClick={() => setIsOpen((prev) => !prev)}
        className="cursor-pointer flex w-full items-center justify-between rounded-lg border border-outline-default bg-bg-surface p-4 text-left text-body-15 focus:outline-none"
      >
        <span className={selectedOption ? "text-body-primary" : "text-caption-label"}>
          {selectedOption ? optionLabel(selectedOption, selectedIndex) : placeholder}
        </span>

        <ExpandIcon
          className={cn(
            "h-6 w-6 shrink-0 text-icon-neutral-default transition-transform",
            isOpen && "rotate-180"
          )}
          aria-hidden
        />
      </button>

      {isOpen && (
        <ul className="absolute top-full z-20 mt-2 w-full overflow-hidden rounded-lg border border-outline-sub bg-bg-surface py-2 shadow-lg">
          {options.map((option, index) => (
            <li key={option.id}>
              <button
                type="button"
                onClick={() => {
                  onChange(option.id);
                  setIsOpen(false);
                }}
                className={cn(
                  "w-full px-4 py-3 text-left text-body-17 transition-colors hover:bg-bg-neutral-hover",
                  option.id === value ? "text-primary-default" : "text-body-primary"
                )}
              >
                {optionLabel(option, index)}
              </button>
            </li>
          ))}
        </ul>
      )}
    </div>
  );
}
