"use client";

import { useState } from "react";
import { sortPriorArts } from "@/lib/priorArtRelevance";
import type { PriorArt } from "@/types/search.type";

export const PRIOR_ART_SORT_OPTIONS = ["관련도 순", "최신순"] as const;
export type PriorArtSortOption = (typeof PRIOR_ART_SORT_OPTIONS)[number];

// 선행문헌 목록 정렬 드롭다운(관련도 순/최신순) -> 탐색 결과 페이지/내 활동기록 개별 프로젝트 페이지에서 공용으로 사용
export function usePriorArtSort(priorArts: PriorArt[]) {
  const [sortOption, setSortOption] = useState<PriorArtSortOption>("관련도 순");

  const sorted = sortPriorArts(priorArts, sortOption);

  return { sortOption, setSortOption, sorted };
}
