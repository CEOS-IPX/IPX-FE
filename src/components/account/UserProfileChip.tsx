"use client";

import { useEffect, useRef, useState } from "react";
import { ProfileMenu } from "./ProfileMenu";

interface UserProfileChipProps {
  name: string;
  email: string;
  onAccountManage?: () => void;
  onChangePassword?: () => void;
  onLogout?: () => void;
}

export function UserProfileChip({
  name,
  email,
  onAccountManage,
  onChangePassword,
  onLogout,
}: UserProfileChipProps) {
  const [isOpen, setIsOpen] = useState(false);
  const containerRef = useRef<HTMLDivElement>(null);
  const initial = name.charAt(0);

  useEffect(() => {
    function handleClickOutside(e: MouseEvent) {
      if (containerRef.current && !containerRef.current.contains(e.target as Node)) {
        setIsOpen(false);
      }
    }

    document.addEventListener("mousedown", handleClickOutside);
    return () => document.removeEventListener("mousedown", handleClickOutside);
  }, []);

  return (
    <div ref={containerRef} className="relative">
      <button
        type="button"
        onClick={() => setIsOpen((prev) => !prev)}
        className="flex cursor-pointer items-center gap-1.5 rounded-full border border-outline-sub bg-bg-surface p-1.5 transition-colors hover:bg-bg-neutral-hover active:bg-bg-neutral-subtle"
      >
        <span className="flex h-7 w-7 shrink-0 items-center justify-center rounded-full bg-bg-profile text-label-emphasis-15 text-inverse-on-primary">
          {initial}
        </span>

        <span className="text-label-emphasis-15 text-title-secondary">{name}</span>
      </button>

      {isOpen && (
        <div className="absolute right-0 top-full z-20 mt-2">
          <ProfileMenu
            name={name}
            email={email}
            onAccountManage={() => {
              setIsOpen(false);
              onAccountManage?.();
            }}
            onChangePassword={() => {
              setIsOpen(false);
              onChangePassword?.();
            }}
            onLogout={() => {
              setIsOpen(false);
              onLogout?.();
            }}
          />
        </div>
      )}
    </div>
  );
}
