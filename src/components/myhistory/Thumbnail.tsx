"use client";

import { useKiprisThumbnail } from "@/hooks/useKiprisThumbnail";

export interface Patent {
  id: string;
  thumbnailUrl?: string;
  applicationNumber?: string;
}

interface ThumbnailProps {
  patents: Patent[];
  totalCount?: number;
}

function ThumbnailSlot({
  patent,
  index,
  showOverlay,
  extraCount,
}: {
  patent?: Patent;
  index: number;
  showOverlay: boolean;
  extraCount: number;
}) {
  const kiprisUrl = useKiprisThumbnail(
    patent?.thumbnailUrl ? undefined : patent?.applicationNumber
  );
  const resolvedUrl = patent?.thumbnailUrl ?? kiprisUrl;

  return (
    <div
      role={resolvedUrl ? "img" : undefined}
      aria-label={resolvedUrl ? `특허 썸네일 ${index + 1}` : undefined}
      className="relative aspect-square overflow-hidden rounded-lg bg-bg-neutral-subtle bg-cover bg-center bg-no-repeat"
      style={resolvedUrl ? { backgroundImage: `url("${resolvedUrl}")` } : undefined}
    >
      {showOverlay && (
        <div className="absolute inset-0 flex items-center justify-center bg-scrim-1">
          <span className="text-title-20 text-inverse-on-primary">+{extraCount}</span>
        </div>
      )}
    </div>
  );
}

export function Thumbnail({ patents, totalCount }: ThumbnailProps) {
  const extraCount = (totalCount ?? patents.length) - 3;

  return (
    <div className="grid grid-cols-4 gap-2">
      {Array.from({ length: 4 }).map((_, i) => {
        const patent = patents[i];
        const isLastSlot = i === 3;
        const showOverlay = isLastSlot && extraCount > 0;

        return (
          <ThumbnailSlot
            key={patent?.id ?? i}
            patent={patent}
            index={i}
            showOverlay={showOverlay}
            extraCount={extraCount}
          />
        );
      })}
    </div>
  );
}
