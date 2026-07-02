"use client";

import { useEffect, useRef, useState } from "react";
import Link from "next/link";
import MoreIcon from "@/components/icons/icon-more_vert.svg";
import { Chip } from "./ProjectCardChip";
import { Menu } from "./Menu";
import { Thumbnail, type Patent } from "./Thumbnail";

type ProjectStatus = "선행 조사 중" | "완료";

interface ProjectCardProps {
  id: string;
  status: ProjectStatus;
  title: string;
  company: string;
  manager: string;
  patents: Patent[];
  onEdit?: () => void;
  onDelete?: () => void;
}

export function ProjectCard({
  id,
  status,
  title,
  company,
  manager,
  patents,
  onEdit,
  onDelete,
}: ProjectCardProps) {
  const [menuOpen, setMenuOpen] = useState(false);
  const menuRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    if (!menuOpen) return;
    const handler = (e: MouseEvent) => {
      if (menuRef.current && !menuRef.current.contains(e.target as Node)) {
        setMenuOpen(false);
      }
    };

    document.addEventListener("mousedown", handler);
    return () => document.removeEventListener("mousedown", handler);
  }, [menuOpen]);

  return (
    <Link
      href={`/myhistory/${id}`}
      className="border border-outline-sub relative flex w-131 flex-col rounded-lg bg-bg-surface p-6 hover:bg-bg-neutral-hover"
    >
      <div className="flex h-6.5 mb-4 items-center justify-between">
        <Chip variant={status === "선행 조사 중" ? "primary" : "secondary"}>{status}</Chip>

        <div ref={menuRef} className="relative">
          <button
            type="button"
            onClick={(e) => {
              e.preventDefault();
              setMenuOpen((v) => !v);
            }}
            aria-label="더보기"
            className="text-icon-neutral-default flex cursor-pointer items-center justify-center"
          >
            <MoreIcon className="h-6 w-6" aria-hidden />
          </button>

          {menuOpen && (
            <Menu
              onEdit={() => {
                setMenuOpen(false);
                onEdit?.();
              }}
              onDelete={() => {
                setMenuOpen(false);
                onDelete?.();
              }}
            />
          )}
        </div>
      </div>

      <div className="flex flex-col gap-1 mb-6">
        <p className="text-title-emphasis-20 line-clamp-1 text-title-primary">{title}</p>
        <div className="flex flex-row gap-1 text-body-15 text-caption-label">
          <p>{company}</p>
          <p>·</p>
          <p>{manager}</p>
        </div>
      </div>

      <Thumbnail patents={patents} />
    </Link>
  );
}
