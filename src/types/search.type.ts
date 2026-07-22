//구성요소 분해 페이지
//ai 자동 추출 버튼 api request&response
export type ExtractComponentsRequest = {
  title: string;
  description: string;
  technicalField: string;
};

export type ExtractedComponent = {
  label: string;
  name: string;
  description: string;
};

export type ExtractComponentsResponse = {
  components: ExtractedComponent[];
};

//선행기술 탐색 실행  버튼 api request&response
export type StartSearchAdditionalInfo = {
  priorArtReference?: string;
  differentiationNotes?: string;
  measurementConditions?: string;
  measurementResults?: string;
};

export type StartSearchComponent = {
  name: string;
  description: string;
};

export type StartSearchRequest = {
  caseId?: number | null;
  title: string;
  description: string;
  applicantName: string;
  inventorName: string;
  technicalField: string;
  userInputIpc?: string[];
  requiredApplicationNumbers?: string[];
  resultCount: number;
  components: StartSearchComponent[];
  additionalInfo?: StartSearchAdditionalInfo;
};

export type StartSearchResponse = {
  caseId: number;
  status: string;
};

//로딩 페이지
//진행률 조회 api
export type SearchStatus =
  | "in_progress"
  | "completed"
  | "no_results"
  | "invalid_input"
  | "failed"
  | "cancelled";

export type SearchStatusResponse = {
  caseId: number;
  status: SearchStatus;
  step: string;
  progress: number;
  reasonInvalid?: string | null;
  error?: string | null;
};

//선행기술 탐색 중단하기 버튼 api
export type CancelSearchResponse = {
  caseId: number;
  cancelled: boolean;
};

// 선행기술 탐색 결과 페이지
// 사건별 선행문헌 목록 조회
export type PriorArtRelevance = "VERY_HIGH" | "HIGH" | "MEDIUM" | "LOW" | "VERY_LOW";

export type PriorArt = {
  priorArtId: number;
  applicationNumber: string;
  title: string;
  applicantName: string;
  applicationDate: string;
  legalStatus: string;
  keywords: string[];
  reason: string;
  rrfScore: number;
  relevance: PriorArtRelevance;
};

export type GetPriorArtsResponse = {
  totalCount: number;
  priorArts: PriorArt[];
};

// 구성요소 분해 페이지+선행기술 탐색 결과 페이지
// 출원번호로 선행문헌 수동 추가 api
export type AddPriorArtsManualRequest = {
  applicationNumbers: string[];
};
