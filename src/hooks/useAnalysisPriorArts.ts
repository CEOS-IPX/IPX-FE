"use client";

import { useEffect, useState } from "react";
import { getPriorArts, getPriorArtDetail, PRIOR_ARTS_ERROR_MESSAGES } from "@/lib/api/search";
import { ApiError } from "@/lib/api/error";
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

// 기술 분석 - 개별 사건 페이지: 선행문헌 목록 조회 + 주인용 선택(상세 조회 후 우측 패널에 표시)
export function useAnalysisPriorArts(id: string) {
  const selectedPatent = useAnalysisStore((state) => state.selectedPatent);
  const setSelectedPatent = useAnalysisStore((state) => state.setSelectedPatent);

  const [result, setResult] = useState<{ id: string; priorArts: PriorArt[] } | null>(null);
  const [requestError, setRequestError] = useState<{ id: string; message: string } | null>(null);
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
      .then((data) => {
        if (cancelled) return;
        setRequestError(null);
        setResult({ id, priorArts: data.priorArts });
      })
      .catch((err) => {
        if (cancelled) return;
        setResult(null);
        setRequestError({
          id,
          message:
            err instanceof ApiError
              ? (PRIOR_ARTS_ERROR_MESSAGES[err.errorCode] ??
                err.message ??
                "선행문헌 목록을 불러오는 중 오류가 발생했습니다.")
              : "선행문헌 목록을 불러오는 중 오류가 발생했습니다.",
        });
      });

    return () => {
      cancelled = true;
    };
  }, [id]);

  const isValidId = Boolean(id) && !Number.isNaN(Number(id));
  const priorArts = result?.id === id ? result.priorArts : [];
  const error = !isValidId
    ? "잘못된 사건 번호입니다."
    : requestError?.id === id
      ? requestError.message
      : null;
  const isLoading = isValidId && result?.id !== id && !error;

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

  return {
    selectedPatent,
    priorArts,
    isLoading,
    error,
    selectingId,
    selectError,
    handleSelect,
  };
}
