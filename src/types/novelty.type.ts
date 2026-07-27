export type NoveltyOverallSimilarity = "VERY_HIGH" | "HIGH" | "MEDIUM" | "LOW" | "VERY_LOW";

export type NoveltyComparisonResult = "IDENTICAL" | "SIMILAR" | "NOVEL";

export type NoveltyPrimaryArt = {
  applicationNumber: string;
  title: string;
  applicantName: string;
  applicationDate: string;
  legalStatus: string;
};

export type NoveltyComparison = {
  comparisonId: number;
  componentLabel: string;
  componentName: string;
  comparisonResult: NoveltyComparisonResult;
  disclosureText: string;
  citation?: string | null;
};

export type NoveltyAnalysisResponse = {
  analysisId: number;
  primaryArt: NoveltyPrimaryArt;
  overallSimilarity: NoveltyOverallSimilarity;
  conclusionText: string;
  comparisons: NoveltyComparison[];
};

export type UpdateNoveltyComparisonRequest = {
  comparisonResult: NoveltyComparisonResult;
  citation?: string | null;
};

export type UpdateNoveltyComparisonResponse = {
  comparisonId: number;
  comparisonResult: NoveltyComparisonResult;
  comparisonResultLabel: string;
  citation?: string | null;
};
