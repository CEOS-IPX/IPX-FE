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

  // 조회 결과를 요청 당시의 priorArtId와 함께 저장해서, id가 바뀌면 파생값(detail/error/isLoading)이
  // 자동으로 "로딩 중" 상태로 돌아가도록 한다 (같은 페이지에서 id만 바뀌는 네비게이션에서 이전 상세가 잠깐 보이는 것 방지).
  const [result, setResult] = useState<{ priorArtId: string; detail: PriorArtDetail } | null>(null);
  const [requestError, setRequestError] = useState<{ priorArtId: string; message: string } | null>(
    null
  );

  //선행문헌 상세 조회
  useEffect(() => {
    if (!priorArtId) return;

    let cancelled = false;

    getPriorArtDetail(Number(priorArtId))
      .then((data) => {
        if (cancelled) return;
        setRequestError(null);
        setResult({ priorArtId, detail: data });
      })
      .catch((err) => {
        if (cancelled) return;

        setResult(null);
        setRequestError({
          priorArtId,
          message:
            err instanceof ApiError
              ? (PRIOR_ART_DETAIL_ERROR_MESSAGES[err.errorCode] ??
                err.message ??
                "선행문헌 상세를 불러오는 중 오류가 발생했습니다.")
              : "선행문헌 상세를 불러오는 중 오류가 발생했습니다.",
        });
      });

    return () => {
      cancelled = true;
    };
  }, [priorArtId]);

  const detail = result?.priorArtId === priorArtId ? result.detail : null;
  const error = requestError?.priorArtId === priorArtId ? requestError.message : null;
  const isLoading = Boolean(priorArtId) && !detail && !error;
  const thumbnailUrl = useKiprisThumbnail(detail?.applicationNumber);

  return { priorArtId, detail, isLoading, error, thumbnailUrl };
}
