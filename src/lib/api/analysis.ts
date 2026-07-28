import { apiRequest } from "@/lib/api/client";
import type {
  InventiveStepAnalysisResponse,
  RunInventiveStepAnalysisRequest,
  UpdateInventiveArgumentRequest,
  UpdateInventiveArgumentResponse,
} from "@/types/inventiveStep.type";
import type {
  NoveltyAnalysisResponse,
  UpdateNoveltyComparisonRequest,
  UpdateNoveltyComparisonResponse,
} from "@/types/novelty.type";
import type {
  CreateReportRequest,
  ReportDetailResponse,
  ReportSummaryResponse,
} from "@/types/report.type";

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

export function updateNoveltyComparison(
  comparisonId: string | number,
  body: UpdateNoveltyComparisonRequest
) {
  return apiRequest<UpdateNoveltyComparisonResponse>(
    `/novelty-comparisons/${encodeURIComponent(String(comparisonId))}`,
    {
      method: "PATCH",
      body,
    }
  );
}

export function createReport(caseId: string | number, body: CreateReportRequest) {
  return apiRequest<ReportSummaryResponse>(`/cases/${encodeURIComponent(String(caseId))}/report`, {
    method: "POST",
    body,
  });
}

export function getReport(caseId: string | number) {
  return apiRequest<ReportDetailResponse>(`/cases/${encodeURIComponent(String(caseId))}/report`);
}
