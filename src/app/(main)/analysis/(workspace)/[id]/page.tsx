"use client";

import { use } from "react";
import { ProjectList } from "@/components/searchlist/ProjectList";
import { ResultListHeader } from "@/components/searchlist/ResultListHeader";
import { BackButton } from "@/components/ui/BackButton";
import { RELEVANCE_LABEL, RELEVANCE_VARIANT } from "@/lib/priorArtRelevance";
import { useAnalysisPriorArts } from "@/hooks/useAnalysisPriorArts";

export default function AnalysisDetailPage({ params }: { params: Promise<{ id: string }> }) {
  const { id } = use(params);
  const { selectedPatent, priorArts, isLoading, error, selectingId, selectError, handleSelect } =
    useAnalysisPriorArts(id);

  return (
    <div data-analysis-id={id} className="flex w-full flex-col items-start gap-4 self-stretch">
      <BackButton />
      <div className="flex w-full flex-col gap-4 self-stretch">
        <ResultListHeader variant="readonly" className="w-full border-t-0" />

        {error && <p className="text-body-15 text-error-default">{error}</p>}
        {selectError && <p className="text-body-15 text-error-default">{selectError}</p>}
        {isLoading && <p className="text-body-15 text-caption-label">불러오는 중...</p>}

        {priorArts.map((priorArt) => {
          const highlighted = selectedPatent?.id === priorArt.priorArtId;

          const handleClick = () => {
            handleSelect(priorArt);
          };

          return (
            <ProjectList
              key={priorArt.priorArtId}
              data-analysis-project
              showCheckbox={false}
              highlighted={highlighted}
              className="w-full cursor-pointer"
              title={priorArt.title}
              organization={priorArt.applicantName}
              year={priorArt.applicationDate.slice(0, 4)}
              tags={priorArt.keywords}
              status={priorArt.legalStatus}
              relevanceLabel={RELEVANCE_LABEL[priorArt.relevance]}
              relevanceVariant={RELEVANCE_VARIANT[priorArt.relevance]}
              applicationNumber={priorArt.applicationNumber}
              thumbnailAlt={`${priorArt.title} 대표 이미지`}
              role="button"
              tabIndex={0}
              aria-pressed={highlighted}
              aria-busy={selectingId === priorArt.priorArtId}
              onClick={handleClick}
              onKeyDown={(event) => {
                if (event.key === "Enter" || event.key === " ") {
                  event.preventDefault();
                  handleClick();
                }
              }}
            />
          );
        })}
      </div>
    </div>
  );
}
