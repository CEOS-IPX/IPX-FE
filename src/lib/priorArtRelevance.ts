import type { PriorArtRelevance } from "@/types/search.type";

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
