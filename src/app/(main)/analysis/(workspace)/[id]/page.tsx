"use client";

import { use, useEffect, useState } from "react";
import { ProjectList } from "@/components/searchlist/ProjectList";
import { ResultListHeader } from "@/components/searchlist/ResultListHeader";
import { BackButton } from "@/components/ui/BackButton";
import { getPriorArts, getPriorArtDetail, PRIOR_ARTS_ERROR_MESSAGES } from "@/lib/api/search";
import { ApiError } from "@/lib/api/error";
import { RELEVANCE_LABEL, RELEVANCE_VARIANT } from "@/lib/priorArtRelevance";
import { formatPeriod } from "@/lib/priorArtFormat";
import { useAnalysisStore } from "@/store/analysisStore";
import type { PriorArt } from "@/types/search.type";

// 선행문헌 상세 조회 api 에러코드별 메시지(주인용 선택 시 상세 조회에 사용)
const PRIOR_ART_DETAIL_ERROR_MESSAGES: Record<string, string> = {
  SC001: "인증이 필요합니다.",
  CA002: "해당 사건에 접근할 권한이 없습니다.",
  P001: "해당 선행기술을 찾을 수 없습니다.",
  P003: "선행기술 문서를 찾을 수 없습니다.",
  O001: "특허 검색 서버와 통신 중 오류가 발생했습니다.",
  C002: "서버 내부 오류가 발생했습니다.",
};

export default function AnalysisDetailPage({ params }: { params: Promise<{ id: string }> }) {
  const { id } = use(params);
  const selectedPatent = useAnalysisStore((state) => state.selectedPatent);
  const setSelectedPatent = useAnalysisStore((state) => state.setSelectedPatent);

  const [priorArts, setPriorArts] = useState<PriorArt[]>([]);
  const [isLoading, setIsLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);
  const [selectingId, setSelectingId] = useState<number | null>(null);
  const [selectError, setSelectError] = useState<string | null>(null);

  useEffect(() => {
    setSelectedPatent(null);

    const clearSelectionOutsideProject = (event: PointerEvent) => {
      if (
        event.target instanceof Element &&
        !event.target.closest("[data-analysis-project]") &&
        !event.target.closest("[data-analysis-right-panel]")
      ) {
        setSelectedPatent(null);
      }
    };

    document.addEventListener("pointerdown", clearSelectionOutsideProject);

    return () => {
      document.removeEventListener("pointerdown", clearSelectionOutsideProject);
      setSelectedPatent(null);
    };
  }, [setSelectedPatent]);

  //사건별 선행문헌 목록 조회
  useEffect(() => {
    const caseId = Number(id);
    if (!id || Number.isNaN(caseId)) return;

    let cancelled = false;

    getPriorArts(caseId)
      .then((result) => {
        if (cancelled) return;
        setPriorArts(result.priorArts);
        setError(null);
      })
      .catch((err) => {
        if (cancelled) return;
        if (err instanceof ApiError) {
          setError(
            PRIOR_ARTS_ERROR_MESSAGES[err.errorCode] ||
              err.message ||
              "선행문헌 목록을 불러오는 중 오류가 발생했습니다."
          );
        } else {
          setError("선행문헌 목록을 불러오는 중 오류가 발생했습니다.");
        }
      })
      .finally(() => {
        if (cancelled) return;
        setIsLoading(false);
      });

    return () => {
      cancelled = true;
    };
  }, [id]);

  //주인용으로 선택 -> 선행문헌 상세 조회 후 우측 패널에 표시
  const handleSelect = async (priorArt: PriorArt) => {
    setSelectError(null);
    setSelectingId(priorArt.priorArtId);

    try {
      const detail = await getPriorArtDetail(priorArt.priorArtId);
      const legalStatusLabel = detail.legalStatus ?? "-";

      setSelectedPatent({
        id: detail.priorArtId,
        title: detail.title || "-",
        patentNumber: detail.registrationNumber || detail.applicationNumber,
        applicationNumber: detail.applicationNumber,
        organization: detail.applicantName || "-",
        applicationDate: detail.applicationDate || "-",
        registrationDate: detail.registrationDate || "-",
        applicationPeriod: formatPeriod(detail.applicationDate, detail.registrationDate),
        currentStatus: legalStatusLabel,
        summary: detail.summary || "-",
        purpose: detail.techPurpose || "-",
        mainFeatures: detail.keyFeatures.length > 0 ? detail.keyFeatures.join(", ") : "-",
      });
    } catch (err) {
      if (err instanceof ApiError) {
        setSelectError(
          PRIOR_ART_DETAIL_ERROR_MESSAGES[err.errorCode] ||
            err.message ||
            "선행문헌 상세를 불러오는 중 오류가 발생했습니다."
        );
      } else {
        setSelectError("선행문헌 상세를 불러오는 중 오류가 발생했습니다.");
      }
    } finally {
      setSelectingId(null);
    }
  };

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
