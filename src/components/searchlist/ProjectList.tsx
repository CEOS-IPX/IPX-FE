"use client";

import { useState, type HTMLAttributes } from "react";
import { Checkbox } from "@/components/searchlist/Checkbox";
import { Recommendation } from "@/components/searchlist/Recommendation";
import { TagChip } from "@/components/searchlist/TagChip";
import { StatusBadge, type StatusBadgeProps } from "@/components/searchlist/StatusBadge";
import { useKiprisThumbnail } from "@/hooks/useKiprisThumbnail";
import { useLineOverflow } from "@/hooks/useLineOverflow";
import { HighlightedText } from "@/components/ui/HighlightedText";
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
  applicationNumber?: string;
  thumbnailAlt?: string;
  showCheckbox?: boolean;
  selected?: boolean;
  highlighted?: boolean;
  highlight?: string;
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
  applicationNumber,
  thumbnailAlt = "",
  showCheckbox = true,
  selected,
  highlighted = false,
  highlight,
  onSelectedChange,
  className,
  ...props
}: ProjectListProps) {
  const kiprisThumbnailUrl = useKiprisThumbnail(thumbnailUrl ? undefined : applicationNumber);
  const resolvedThumbnailUrl = thumbnailUrl ?? kiprisThumbnailUrl;
  const showSelectionCheckbox = showCheckbox && !highlighted;

  const { measureRef, reserveRef, visibleCount, isOverflowing } = useLineOverflow(tags.length);
  const [tagsExpanded, setTagsExpanded] = useState(false);
  const visibleTags = tagsExpanded ? tags : tags.slice(0, visibleCount);
  const showMoreTags = isOverflowing && !tagsExpanded;

  return (
    <article
      data-highlighted={highlighted || undefined}
      className={cn(
        "flex items-start",
        highlighted
          ? "w-246.25 gap-6 rounded-lg border border-inverse-on-primary-2 bg-bg-primary-tint p-4"
          : "w-5xl py-4",
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
              role={resolvedThumbnailUrl ? "img" : undefined}
              aria-label={resolvedThumbnailUrl ? thumbnailAlt : undefined}
              className="flex size-20 shrink-0 aspect-square items-center justify-center gap-2.5 rounded-sm border border-outline-sub bg-bg-neutral-subtle bg-cover bg-center bg-no-repeat p-2.5"
              style={
                resolvedThumbnailUrl
                  ? { backgroundImage: `url("${resolvedThumbnailUrl}")` }
                  : undefined
              }
            />

            <div className="flex min-w-0 flex-1 flex-col items-start">
              <h3 className="w-full line-clamp-1 text-title-20 text-title-primary">
                <HighlightedText text={title} highlight={highlight} />
              </h3>

              <div className="mt-1 flex items-center gap-1.5 text-body-15 text-caption-label">
                <span className="truncate">{organization}</span>
                <span
                  className="size-0.75 shrink-0 rounded-full bg-icon-neutral-subtle"
                  aria-hidden
                />
                <span className="shrink-0">{year}</span>
              </div>

              <div className="relative mt-3 w-full">
                <div
                  ref={measureRef}
                  className="invisible absolute inset-x-0 top-0 flex flex-wrap items-center gap-1.5"
                  aria-hidden
                >
                  {tags.map((tag) => (
                    <TagChip key={tag} label={tag} active={highlighted} />
                  ))}
                </div>

                <button
                  ref={reserveRef}
                  type="button"
                  tabIndex={-1}
                  aria-hidden
                  className="invisible absolute top-0 left-0 ml-2 shrink-0 text-label-15"
                >
                  더보기
                </button>

                <div className="flex flex-wrap items-center gap-1.5">
                  {visibleTags.map((tag) => (
                    <TagChip key={tag} label={tag} active={highlighted} />
                  ))}
                  {showMoreTags && (
                    <button
                      type="button"
                      onClick={(event) => {
                        event.preventDefault();
                        event.stopPropagation();
                        setTagsExpanded(true);
                      }}
                      className="ml-2 shrink-0 text-label-15 text-primary-default hover:underline"
                    >
                      더보기
                    </button>
                  )}
                </div>
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
