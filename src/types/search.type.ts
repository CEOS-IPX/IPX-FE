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
