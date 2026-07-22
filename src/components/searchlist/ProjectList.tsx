"use client";

import type { HTMLAttributes } from "react";
import { Checkbox } from "@/components/searchlist/Checkbox";
import { Recommendation } from "@/components/searchlist/Recommendation";
import { TagChip } from "@/components/searchlist/TagChip";
import { StatusBadge, type StatusBadgeProps } from "@/components/searchlist/StatusBadge";
import { cn } from "@/lib/cn";

export type ProjectListProps = HTMLAttributes<HTMLElement> & {
  title: string;
  organization: string;
  year: string | number;
  tags: string[];
  status: string;
  relevanceLabel: string;
  relevanceVariant?: StatusBadgeProps["variant"];
  recommendationReason?: string;
  thumbnailUrl?: string;
  thumbnailAlt?: string;
  showCheckbox?: boolean;
  selected?: boolean;
  highlighted?: boolean;
  onSelectedChange?: (selected: boolean) => void;
};

export function ProjectList({
  title,
  organization,
  year,
  tags,
  status,
  relevanceLabel,
  relevanceVariant = "verygood",
  recommendationReason,
  thumbnailUrl,
  thumbnailAlt = "",
  showCheckbox = true,
  selected,
  highlighted = false,
  onSelectedChange,
  className,
  ...props
}: ProjectListProps) {
  const showSelectionCheckbox = showCheckbox && !highlighted;

  return (
    <article
      data-highlighted={highlighted || undefined}
      className={cn(
        "flex items-start",
        highlighted
          ? "w-[61.5625rem] gap-6 rounded-[0.5rem] border border-inverse-on-primary-2 bg-bg-primary-tint p-4"
          : "w-[64rem] py-4",
        !highlighted && (showSelectionCheckbox ? "gap-6 px-3" : "px-4"),
        className
      )}
      {...props}
    >
      {showSelectionCheckbox && (
        <Checkbox
          aria-label="프로젝트 선택"
          checked={selected}
          onChange={(event) => onSelectedChange?.(event.target.checked)}
          className="aspect-square shrink-0"
        />
      )}

      <div className="flex min-w-0 flex-1 flex-col gap-3">
        <div className="flex min-w-0 flex-1 items-stretch">
          <div className={cn("flex min-w-0 flex-1 items-start", highlighted ? "gap-6" : "gap-5")}>
            <div
              role={thumbnailUrl ? "img" : undefined}
              aria-label={thumbnailUrl ? thumbnailAlt : undefined}
              className="flex size-20 shrink-0 aspect-square items-center justify-center gap-2.5 rounded-[0.25rem] border border-outline-sub bg-bg-neutral-subtle bg-cover bg-center bg-no-repeat p-2.5"
              style={thumbnailUrl ? { backgroundImage: `url("${thumbnailUrl}")` } : undefined}
            />

            <div className="flex min-w-0 flex-1 flex-col items-start">
              <h3 className="w-full line-clamp-1 text-title-20 text-title-primary">{title}</h3>

              <div className="mt-1 flex items-center gap-1.5 text-body-15 text-caption-label">
                <span className="truncate">{organization}</span>
                <span
                  className="size-0.75 shrink-0 rounded-full bg-icon-neutral-subtle"
                  aria-hidden
                />
                <span className="shrink-0">{year}</span>
              </div>

              <div className="mt-3 flex flex-wrap items-center gap-1.5">
                {tags.map((tag) => (
                  <TagChip key={tag} label={tag} active={highlighted} />
                ))}
              </div>
            </div>
          </div>

          <div className="flex w-25 shrink-0 items-center justify-center self-stretch p-2.5 text-label-17 text-title-primary">
            {status}
          </div>

          <div className="flex w-25 shrink-0 items-center justify-center self-stretch">
            <StatusBadge variant={relevanceVariant}>{relevanceLabel}</StatusBadge>
          </div>
        </div>

        {recommendationReason && <Recommendation reason={recommendationReason} />}
      </div>
    </article>
  );
}
