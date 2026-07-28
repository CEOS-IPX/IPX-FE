import type { PriorArt, PriorArtRelevance } from "@/types/search.type";

// 선행문헌 목록(탐색 결과 / 내 활동 기록 저장된 특허 목록)에서 공용으로 쓰는 관련도 표시 매핑 -> 따로 컴포넌트로 분리시킴
export const RELEVANCE_LABEL: Record<PriorArtRelevance, string> = {
  VERY_HIGH: "매우 높음",
  HIGH: "높음",
  MEDIUM: "보통",
  LOW: "낮음",
  VERY_LOW: "매우 낮음",
};

export const RELEVANCE_VARIANT: Record<
  PriorArtRelevance,
  "verygood" | "good" | "related" | "bad" | "hold"
> = {
  VERY_HIGH: "verygood",
  HIGH: "good",
  MEDIUM: "related",
  LOW: "bad",
  VERY_LOW: "hold",
};

// 정렬 방식 -> 관련도 순 정렬 위한 순위!!
export const RELEVANCE_RANK: Record<PriorArtRelevance, number> = {
  VERY_HIGH: 4,
  HIGH: 3,
  MEDIUM: 2,
  LOW: 1,
  VERY_LOW: 0,
};

// 선행문헌 상세 조회 api는 relevance enum 없이 rrfScore만 내려주므로, 목록 api와 동일한 등급으로 프론트에서 환산(백엔드와 임계값 확인 완료~~)
export function scoreToRelevance(rrfScore: number): PriorArtRelevance {
  if (rrfScore >= 0.8) return "VERY_HIGH";
  if (rrfScore >= 0.6) return "HIGH";
  if (rrfScore >= 0.4) return "MEDIUM";
  if (rrfScore >= 0.2) return "LOW";
  return "VERY_LOW";
}

//정렬 방식 공통으로 사용(탐색 결과 페이지, 개별 프로젝트 내 상세 페이지)
export function sortPriorArts(priorArts: PriorArt[], sortOption: string): PriorArt[] {
  const sorted = [...priorArts];
  if (sortOption === "최신순") {
    sorted.sort((a, b) => b.applicationDate.localeCompare(a.applicationDate));
  } else {
    sorted.sort((a, b) => RELEVANCE_RANK[b.relevance] - RELEVANCE_RANK[a.relevance]);
  }
  return sorted;
}
