import { apiRequest } from "@/lib/api/client";
import type { NoveltyAnalysisResponse } from "@/types/novelty.type";

export function runNoveltyAnalysis(caseId: string | number) {
  return apiRequest<NoveltyAnalysisResponse>(
    `/cases/${encodeURIComponent(String(caseId))}/novelty-analysis`,
    {
      method: "POST",
    }
  );
}
