"use client";

import { useCallback, useLayoutEffect, useRef, useState, type HTMLAttributes } from "react";
import { Checkbox } from "@/components/searchlist/Checkbox";
import { Recommendation } from "@/components/searchlist/Recommendation";
import { TagChip } from "@/components/searchlist/TagChip";
import { StatusBadge, type StatusBadgeProps } from "@/components/searchlist/StatusBadge";
import { useKiprisThumbnail } from "@/hooks/useKiprisThumbnail";
import { HighlightedText } from "@/components/ui/HighlightedText";
import ChevronIcon from "@/components/icons/icon-back.svg";
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

  // 한 줄 고정 + 화살표 버튼으로 옆으로 스크롤
  const tagScrollRef = useRef<HTMLDivElement>(null);
  const [canScrollMore, setCanScrollMore] = useState(false);

  const checkScrollOverflow = useCallback(() => {
    const el = tagScrollRef.current;
    if (!el) return;
    setCanScrollMore(el.scrollWidth - el.scrollLeft - el.clientWidth > 1);
  }, []);

  useLayoutEffect(() => {
    checkScrollOverflow();

    const el = tagScrollRef.current;
    if (!el) return;

    const observer = new ResizeObserver(checkScrollOverflow);
    observer.observe(el);
    el.addEventListener("scroll", checkScrollOverflow);

    return () => {
      observer.disconnect();
      el.removeEventListener("scroll", checkScrollOverflow);
    };
  }, [checkScrollOverflow, tags.length]);

  const handleScrollTags = (event: React.MouseEvent) => {
    event.preventDefault();
    event.stopPropagation();
    tagScrollRef.current?.scrollBy({ left: 160, behavior: "smooth" });
  };

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
                  ref={tagScrollRef}
                  className={cn(
                    "scrollbar-hide flex items-center gap-1.5 overflow-x-auto scroll-smooth",
                    canScrollMore && "pr-9"
                  )}
                >
                  {tags.map((tag) => (
                    <TagChip key={tag} label={tag} active={highlighted} />
                  ))}
                </div>

                {canScrollMore && (
                  <>
                    <div
                      aria-hidden
                      className={cn(
                        "pointer-events-none absolute top-0 right-0 h-full w-9",
                        highlighted ? "bg-bg-primary-tint" : "bg-bg-surface"
                      )}
                    />
                    <div
                      aria-hidden
                      className={cn(
                        "pointer-events-none absolute top-0 right-9 h-full w-12 bg-linear-to-r from-transparent to-80%",
                        highlighted ? "to-bg-primary-tint" : "to-bg-surface"
                      )}
                    />
                    <button
                      type="button"
                      aria-label="태그 더 보기"
                      onClick={handleScrollTags}
                      className="absolute top-1/2 right-0 flex size-8 -translate-y-1/2 items-center justify-center rounded-full bg-bg-surface shadow-[0px_1px_6px_0px_rgba(144,155,165,0.36)]"
                    >
                      <ChevronIcon
                        className="size-5 text-icon-neutral-emphasize [&_path]:fill-current"
                        aria-hidden
                      />
                    </button>
                  </>
                )}
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
