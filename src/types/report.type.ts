export type CreateReportRequest = {
  authorName: string;
  noveltySatisfied: boolean;
  inventiveSatisfied: boolean;
  overallConclusion: string;
};

export type UpdateReportRequest = Partial<{
  authorName: string;
  noveltySatisfied: boolean;
  inventiveSatisfied: boolean;
  overallConclusion: string;
}>;

export type UpdateReportResponse = {
  reportId: number;
  caseId: number;
  authorName: string;
  noveltySatisfied: boolean;
  inventiveSatisfied: boolean;
  overallConclusion: string;
  updatedAt: string;
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

export type ReportPriorArt = {
  priorArtId: number;
  applicationNumber: string;
  title: string | null;
  applicantName: string | null;
  applicationDate: string | null;
  registrationDate: string | null;
  legalStatus: string | null;
  ipcCodes: string[];
};

export type ReportComponent = {
  componentId: number;
  name: string;
  description: string;
  displayOrder: number;
};

export type ReportNoveltyComparison = {
  comparisonId: number;
  componentId: number;
  componentName: string;
  componentDescription: string;
  displayOrder: number;
  disclosureText: string;
  citation: string | null;
  comparisonResult: "IDENTICAL" | "SIMILAR" | "NOVEL";
  comparisonResultLabel: string;
};

export type ReportInventiveArgumentType =
  | "NUMERICAL_LIMIT"
  | "COMBINATION_MOTIVATION"
  | "COMMON_TECHNIQUE"
  | "SIMPLE_DESIGN";

export type ReportInventiveArgument = {
  argumentId: number | null;
  argumentType: ReportInventiveArgumentType;
  argumentTypeLabel: string;
  recommended: boolean;
  content: Record<string, unknown>;
};

export type ReportDetailResponse = ReportSummaryResponse & {
  caseTitle: string;
  applicantName: string | null;
  inventorName: string | null;
  technicalField: string | null;
  description: string | null;
  components: ReportComponent[];
  noveltyAnalysis: {
    analysisId: number;
    overallSimilarity: string;
    overallSimilarityLabel: string;
    conclusionText: string;
    primaryPriorArt: ReportPriorArt;
    comparisons: ReportNoveltyComparison[];
  };
  inventiveStepAnalysis: {
    analysisId: number;
    primaryPriorArt: ReportPriorArt;
    secondaryPriorArt: ReportPriorArt | null;
    arguments: ReportInventiveArgument[];
  };
};
