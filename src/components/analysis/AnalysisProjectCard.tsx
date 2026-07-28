"use client";

import Link from "next/link";
import { useCaseThumbnails } from "@/hooks/useCaseThumbnails";
import { Thumbnail, type Patent } from "@/components/myhistory/Thumbnail";
import { Chip } from "@/components/myhistory/ProjectCardChip";
import { HighlightedText } from "@/components/ui/HighlightedText";

interface AnalysisProjectCardProps {
  id: string;
  title: string;
  company: string;
  manager: string;
  patents?: Patent[];
  isAnalysisDone?: boolean;
  highlight?: string;
}

export function AnalysisProjectCard({
  id,
  title,
  company,
  manager,
  patents,
  isAnalysisDone = false,
  highlight,
}: AnalysisProjectCardProps) {
  const fetchedThumbnails = useCaseThumbnails(patents ? undefined : id);
  const resolvedPatents = patents ?? fetchedThumbnails.patents;
  const totalCount = patents ? patents.length : fetchedThumbnails.totalCount;

  return (
    <Link
      href={`/analysis/${id}?title=${encodeURIComponent(title)}`}
      className="relative flex w-full flex-col gap-6 rounded-lg border border-outline-sub bg-bg-surface p-6 hover:bg-bg-neutral-hover"
    >
      <div className="flex flex-col gap-1">
        <div className="flex items-center gap-1">
          <p className="line-clamp-1 min-w-0 flex-1 text-title-emphasis-20 text-title-primary">
            <HighlightedText text={title} highlight={highlight} />
          </p>
          <Chip variant="primary" className={isAnalysisDone ? "" : "invisible"}>
            분석 완료
          </Chip>
        </div>

        <div className="flex flex-row gap-1 text-body-15 text-caption-label">
          <p>{company}</p>
          <p>·</p>
          <p>{manager}</p>
        </div>
      </div>

      <Thumbnail patents={resolvedPatents} totalCount={totalCount} />
    </Link>
  );
}
