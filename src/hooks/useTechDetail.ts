"use client";

import { useEffect, useState } from "react";
import { useParams } from "next/navigation";
import { getPriorArtDetail } from "@/lib/api/search";
import { ApiError } from "@/lib/api/error";
import { useKiprisThumbnail } from "@/hooks/useKiprisThumbnail";
import type { PriorArtDetail } from "@/types/search.type";

// 선행문헌 상세 조회 api 에러코드별 메시지
const PRIOR_ART_DETAIL_ERROR_MESSAGES: Record<string, string> = {
  SC001: "인증이 필요합니다.",
  CA002: "해당 사건에 접근할 권한이 없습니다.",
  P001: "해당 선행기술을 찾을 수 없습니다.",
  P003: "선행기술 문서를 찾을 수 없습니다.",
  O001: "특허 검색 서버와 통신 중 오류가 발생했습니다.",
  C002: "서버 내부 오류가 발생했습니다.",
};

// 선행기술 상세 페이지: 선행문헌 상세 조회
export function useTechDetail() {
  const params = useParams<{ id: string }>();
  const priorArtId = params.id;

  const [detail, setDetail] = useState<PriorArtDetail | null>(null);
  const [isLoading, setIsLoading] = useState(() => Boolean(priorArtId));
  const [error, setError] = useState<string | null>(null);
  const thumbnailUrl = useKiprisThumbnail(detail?.applicationNumber);

  //선행문헌 상세 조회
  useEffect(() => {
    if (!priorArtId) return;

    let cancelled = false;

    getPriorArtDetail(Number(priorArtId))
      .then((result) => {
        if (cancelled) return;

        setDetail(result);
        setError(null);
      })
      .catch((err) => {
        if (cancelled) return;

        if (err instanceof ApiError) {
          setError(
            PRIOR_ART_DETAIL_ERROR_MESSAGES[err.errorCode] ||
              err.message ||
              "선행문헌 상세를 불러오는 중 오류가 발생했습니다."
          );
        } else {
          setError("선행문헌 상세를 불러오는 중 오류가 발생했습니다.");
        }
      })
      .finally(() => {
        if (cancelled) return;
        setIsLoading(false);
      });

    return () => {
      cancelled = true;
    };
  }, [priorArtId]);

  return { priorArtId, detail, isLoading, error, thumbnailUrl };
}
