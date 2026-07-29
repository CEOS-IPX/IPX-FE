import type { CaseSummary } from "@/types/case.type";

export function deriveCaseSummaryStatusBadge(project: CaseSummary): {
  label: string;
  variant: "primary" | "secondary";
} {
  if (project.status === "REPORT_COMPLETED") {
    return { label: "완료", variant: "secondary" };
  }

  const noveltyCompleted =
    project.noveltyAnalysisExists === true || project.status === "NOVELTY_COMPLETED";
  const inventiveCompleted =
    project.inventiveAnalysisExists === true || project.status === "INVENTIVE_COMPLETED";

  if ((noveltyCompleted && inventiveCompleted) || project.reportAvailable) {
    return { label: "기술 분석 완료", variant: "primary" };
  }
  if (noveltyCompleted) {
    return { label: "신규성 분석 완료", variant: "primary" };
  }
  if (inventiveCompleted) {
    return { label: "진보성 분석 완료", variant: "primary" };
  }

  return { label: project.statusLabel, variant: "primary" };
}
