"use client";

import { useEffect, useState } from "react";
import { getCases } from "@/lib/api/case";
import type { CaseSummary } from "@/types/case.type";

export type AnalysisProject = {
  id: string;
  title: string;
  company: string;
  manager: string;
  isAnalysisDone: boolean;
};

// 백엔드에 분석완료 여부를 나타내는 별도 필드가 없어, 진보성 분석까지 끝난 사건(진보성/리포트 완료)만 "분석 완료"로 간주
function toAnalysisProject(project: CaseSummary): AnalysisProject {
  return {
    id: String(project.caseId),
    title: project.title,
    company: project.applicantName ?? "",
    manager: project.inventorName ?? "",
    isAnalysisDone:
      project.status === "INVENTIVE_COMPLETED" || project.status === "REPORT_COMPLETED",
  };
}

// 기술 분석 페이지 -> 분석 가능한 탐색 기록 목록 조회(내 활동기록과 같은 사건 목록 조회 api 재사용)
export function useAnalysisProjects() {
  const [projects, setProjects] = useState<AnalysisProject[]>([]);
  const [isLoading, setIsLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    let cancelled = false;

    getCases({ statusGroup: "ALL", size: 50 })
      .then((result) => {
        if (cancelled) return;
        // 구성요소 분해 단계(탐색 전)인 사건은 분석할 선행기술이 아직 없어 목록에서 제외
        setProjects(result.cases.filter((c) => c.status !== "NOT_STARTED").map(toAnalysisProject));
        setError(null);
      })
      .catch((err) => {
        if (cancelled) return;
        setError(
          err instanceof Error && err.message
            ? err.message
            : "목록을 불러오는 중 오류가 발생했습니다."
        );
      })
      .finally(() => {
        if (cancelled) return;
        setIsLoading(false);
      });

    return () => {
      cancelled = true;
    };
  }, []);

  return { projects, isLoading, error };
}
