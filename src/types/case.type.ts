// 내 활동 기록 페이지
// 사건 목록 조회 api
export type CaseStatusGroup = "ALL" | "PENDING" | "COMPLETED";
export type CaseSort = "LATEST" | "OLDEST" | "TITLE";

// 각 단계 완료 시각 기준으로, 지금까지 완료된 가장 마지막 단계를 나타냄
// (진행 중/실패/취소 상태는 포함 안 됨 -> 그건 GET /cases/{caseId}/searches/status에서 따로 확인)
export type CaseStatus =
  | "NOT_STARTED"
  | "SEARCH_COMPLETED"
  | "NOVELTY_COMPLETED"
  | "INVENTIVE_COMPLETED"
  | "REPORT_COMPLETED";

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
  status: CaseStatus;
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
  status: CaseStatus;
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
  status: CaseStatus;
  statusLabel: string;
  updatedAt: string;
};

export type GetRecentCasesResponse = {
  cases: RecentCase[];
};

// 재탐색하기(프로젝트 개별 상세 페이지 -> 재탐색하기 버튼 누르면 구성요소 분해 페이지로 이동+저장내용 다시 불러옴) -> 사건에 저장된 구성요소 목록 조회 api
export type CaseComponent = {
  componentId: number;
  displayOrder: number;
  label: string;
  name: string;
  description: string;
};

export type GetCaseComponentsResponse = {
  caseId: number;
  componentCount: number;
  components: CaseComponent[];
};
