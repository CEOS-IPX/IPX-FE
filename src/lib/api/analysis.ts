import { apiRequest } from "@/lib/api/client";
import type {
  InventiveStepAnalysisResponse,
  RunInventiveStepAnalysisRequest,
  UpdateInventiveArgumentRequest,
  UpdateInventiveArgumentResponse,
} from "@/types/inventiveStep.type";
import type { NoveltyAnalysisResponse } from "@/types/novelty.type";

export function runNoveltyAnalysis(caseId: string | number) {
  return apiRequest<NoveltyAnalysisResponse>(
    `/cases/${encodeURIComponent(String(caseId))}/novelty-analysis`,
    {
      method: "POST",
    }
  );
}

export function getNoveltyAnalysis(caseId: string | number) {
  return apiRequest<NoveltyAnalysisResponse>(
    `/cases/${encodeURIComponent(String(caseId))}/novelty-analysis`
  );
}

export function runInventiveStepAnalysis(
  caseId: string | number,
  body: RunInventiveStepAnalysisRequest
) {
  return apiRequest<InventiveStepAnalysisResponse>(
    `/cases/${encodeURIComponent(String(caseId))}/inventive-step-analysis`,
    {
      method: "POST",
      body,
    }
  );
}

export function getInventiveStepAnalysis(caseId: string | number) {
  return apiRequest<InventiveStepAnalysisResponse>(
    `/cases/${encodeURIComponent(String(caseId))}/inventive-step-analysis`
  );
}

export function updateInventiveArgument(
  argumentId: string | number,
  body: UpdateInventiveArgumentRequest
) {
  return apiRequest<UpdateInventiveArgumentResponse>(
    `/inventive-arguments/${encodeURIComponent(String(argumentId))}`,
    {
      method: "PATCH",
      body,
    }
  );
}
