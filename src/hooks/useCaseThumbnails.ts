"use client";

import { useEffect, useState } from "react";
import { getPriorArts } from "@/lib/api/search";
import type { Patent } from "@/components/myhistory/Thumbnail";

// 내 활동기록 리스트의 프로젝트 카드용 - 카드마다 선행문헌 목록을 불러와 앞의 몇 건만 썸네일로 사용
export function useCaseThumbnails(caseId: string | undefined, limit = 4) {
  const [patents, setPatents] = useState<Patent[]>([]);
  const [totalCount, setTotalCount] = useState(0);

  useEffect(() => {
    if (!caseId) return;

    let cancelled = false;

    getPriorArts(Number(caseId))
      .then((result) => {
        if (cancelled) return;
        setPatents(
          result.priorArts.slice(0, limit).map((priorArt) => ({
            id: String(priorArt.priorArtId),
            applicationNumber: priorArt.applicationNumber,
          }))
        );
        setTotalCount(result.totalCount);
      })
      .catch(() => {
        if (cancelled) return;
        setPatents([]);
        setTotalCount(0);
      });

    return () => {
      cancelled = true;
    };
  }, [caseId, limit]);

  return { patents, totalCount };
}
