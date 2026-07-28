export type CreateReportRequest = {
  authorName: string;
  noveltySatisfied: boolean;
  inventiveSatisfied: boolean;
  overallConclusion: string;
};

export type ReportSummaryResponse = {
  reportId: number;
  caseId: number;
  authorName: string;
  noveltySatisfied: boolean;
  inventiveSatisfied: boolean;
  overallConclusion: string;
  reportCompletedAt: string;
  createdAt: string;
  updatedAt: string;
};
