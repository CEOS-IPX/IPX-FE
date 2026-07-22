//구성요소 분해 페이지 ai 자동 추출 버튼 api request&response
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

// 선행기술 탐색 실행 (POST /api/searches) request&response
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

// 선행기술 탐색 시작 -> 로딩페이지에서 진행률 조회
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
