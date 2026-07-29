"use client";

import { useEffect, useState } from "react";
import { useSearchParams } from "next/navigation";
import {
  addPriorArtsManual,
  getPriorArts,
  PRIOR_ARTS_ERROR_MESSAGES,
  ADD_PRIOR_ARTS_MANUAL_ERROR_MESSAGES,
} from "@/lib/api/search";
import { ApiError } from "@/lib/api/error";
import { usePriorArtSort } from "@/hooks/usePriorArtSort";
import type { PriorArt } from "@/types/search.type";

// 선행기술 탐색 결과 페이지: 선행문헌 목록 조회 + 출원번호로 수동 추가
export function useSearchResult() {
  const searchParams = useSearchParams();
  const caseId = searchParams.get("caseId");
  const title = searchParams.get("title");
  const techLinkQuery = title ? `?title=${encodeURIComponent(title)}` : "";

  const [priorArts, setPriorArts] = useState<PriorArt[]>([]);
  const [totalCount, setTotalCount] = useState(0);
  const [isLoading, setIsLoading] = useState(() => Boolean(caseId));
  const [error, setError] = useState<string | null>(null);
  const [isPatentImportModalOpen, setIsPatentImportModalOpen] = useState(false);
  const [isImporting, setIsImporting] = useState(false);
  const [importError, setImportError] = useState<string | null>(null);
  const { setSortOption, sorted: sortedPriorArts } = usePriorArtSort(priorArts);

  //선행기술 목록 불러오는 api
  useEffect(() => {
    if (!caseId) return;

    let cancelled = false;

    getPriorArts(Number(caseId))
      .then((result) => {
        if (cancelled) return;
        setPriorArts(result.priorArts);
        setTotalCount(result.totalCount);
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
  }, [caseId]);

  const openImportModal = () => {
    setImportError(null);
    setIsPatentImportModalOpen(true);
  };

  const closeImportModal = () => {
    setIsPatentImportModalOpen(false);
  };

  //특허번호로 불러오기 api
  const handleImportPatentNumber = async ({ patentNumber }: { patentNumber: string }) => {
    if (!caseId) return;
    const trimmed = patentNumber.trim();
    if (!trimmed) {
      setImportError("특허번호를 입력해주세요.");
      return;
    }

    setImportError(null);
    setIsImporting(true);

    try {
      const result = await addPriorArtsManual(Number(caseId), { applicationNumbers: [trimmed] });
      setPriorArts(result.priorArts);
      setTotalCount(result.totalCount);
      setIsPatentImportModalOpen(false);
    } catch (err) {
      if (err instanceof ApiError) {
        setImportError(
          ADD_PRIOR_ARTS_MANUAL_ERROR_MESSAGES[err.errorCode] ||
            err.message ||
            "선행문헌 추가 중 오류가 발생했습니다."
        );
      } else {
        setImportError("선행문헌 추가 중 오류가 발생했습니다.");
      }
    } finally {
      setIsImporting(false);
    }
  };

  return {
    techLinkQuery,
    totalCount,
    isLoading,
    error: caseId ? error : "사건 정보를 찾을 수 없습니다. 다시 탐색을 시작해주세요.",
    sortedPriorArts,
    setSortOption,
    isPatentImportModalOpen,
    openImportModal,
    closeImportModal,
    isImporting,
    importError,
    handleImportPatentNumber,
  };
}
