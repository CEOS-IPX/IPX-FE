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

// 수정하기 모달 + 삭제 메뉴
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

// 사건 삭제 api
export type DeleteCaseResponse = {
  deletedCaseId: number;
};

// 프로젝트 상세 페이지 (개별 특허 페이지가 아니라 개별 프로젝트에 대한 api, 프로젝트 하나를 선택했을 때)
// 프로젝트별 특허 목록이 아닌 헤드 데이터 조회 api
export type CaseDetail = {
  caseId: number;
  title: string;
  applicantName?: string | null;
  inventorName?: string | null;
  technicalField?: string | null;
  description?: string | null;
  userInputIpc: string[];
  status: string;
  statusLabel: string;
  componentCount: number;
  priorArtCount: number;
  reportAvailable: boolean;
  searchCompletedAt?: string | null;
  noveltyCompletedAt?: string | null;
  inventiveCompletedAt?: string | null;
  reportCompletedAt?: string | null;
  createdAt: string;
  updatedAt: string;
};

// 사이드바 최근 탐색 영역(3개 탭 아래 부분)
// 최근 사건 목록 조회 api
export type RecentCase = {
  caseId: number;
  title: string;
  technicalField?: string | null;
  status: string;
  statusLabel: string;
  updatedAt: string;
};

export type GetRecentCasesResponse = {
  cases: RecentCase[];
};
