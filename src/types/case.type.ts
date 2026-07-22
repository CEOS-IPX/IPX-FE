// 내 활동 기록 페이지
// 사건 목록 조회 api
export type CaseStatusGroup = "ALL" | "PENDING" | "COMPLETED";
export type CaseSort = "LATEST" | "OLDEST" | "TITLE";

export type GetCasesParams = {
  statusGroup?: CaseStatusGroup;
  keyword?: string;
  sort?: CaseSort;
  page?: number;
  size?: number;
};

export type CaseSummary = {
  caseId: number;
  title: string;
  applicantName?: string | null;
  inventorName?: string | null;
  technicalField?: string | null;
  status: string;
  statusLabel: string;
  priorArtCount: number;
  reportAvailable: boolean;
  createdAt: string;
  updatedAt: string;
};

export type GetCasesResponse = {
  totalCount: number;
  pendingCount: number;
  completedCount: number;
  page: number;
  size: number;
  hasNext: boolean;
  cases: CaseSummary[];
};

// 수정하기 모달
// 사건(사명, 출원인) 수정 api
export type UpdateCaseRequest = {
  title?: string;
  applicantName?: string | null;
  inventorName?: string | null;
};

export type UpdateCaseResponse = {
  caseId: number;
  title: string;
  applicantName?: string | null;
  inventorName?: string | null;
  updatedAt: string;
};
