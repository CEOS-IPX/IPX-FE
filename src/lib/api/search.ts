import type {
  ExtractComponentsRequest,
  ExtractComponentsResponse,
  StartSearchRequest,
  StartSearchResponse,
  SearchStatusResponse,
  CancelSearchResponse,
  GetPriorArtsResponse,
  AddPriorArtsManualRequest,
  PriorArtDetail,
} from "@/types/search.type";
import { apiRequest } from "./client";

//구성요소 분해 페이지
//ai 자동 추출 버튼 api
export function extractComponents(body: ExtractComponentsRequest) {
  return apiRequest<ExtractComponentsResponse>("/searches/components/extract", {
    method: "POST",
    body,
  });
}

//선행기술탐색 시작 버튼 api -> 여기서 caseId 생성(나중에 프로젝트 생성 떄 쓰일거임)
export function startSearch(body: StartSearchRequest) {
  return apiRequest<StartSearchResponse>("/searches", {
    method: "POST",
    body,
  });
}

//로딩중 페이지
//진행률 조회 api
export function getSearchStatus(caseId: number) {
  return apiRequest<SearchStatusResponse>(`/cases/${caseId}/searches/status`);
}

// 탐색 중단하기 버튼 api
export function cancelSearch(caseId: number) {
  return apiRequest<CancelSearchResponse>(`/cases/${caseId}/searches/cancel`, {
    method: "POST",
  });
}

// 선행기술 탐색 결과 페이지 + 내 활동 기록(개별 프로젝트) 저장된 특허 목록
// 사건별 선행문헌 목록 조회 (같은 api를 두 화면에서 공용으로 사용)
export function getPriorArts(caseId: number) {
  return apiRequest<GetPriorArtsResponse>(`/cases/${caseId}/prior-arts`);
}

// 에러코드별 메시지 (두 화면에서 동일하게 사용 -> 페이지가 아니라 ts에 저장)
export const PRIOR_ARTS_ERROR_MESSAGES: Record<string, string> = {
  SC001: "인증이 필요합니다.",
  CA002: "해당 사건에 접근할 권한이 없습니다.",
  CA001: "사건을 찾을 수 없습니다.",
  C002: "서버 내부 오류가 발생했습니다.",
};

// 선행기술 탐색 결과 페이지
// 출원번호로 선행문헌 추가 api
export function addPriorArtsManual(caseId: number, body: AddPriorArtsManualRequest) {
  return apiRequest<GetPriorArtsResponse>(`/cases/${caseId}/prior-arts/manual`, {
    method: "POST",
    body,
  });
}

// 선행기술 탐색 결과 상세 페이지
// 선행문헌 상세 조회 api(특허 개별 페이지)
export function getPriorArtDetail(priorArtId: number) {
  return apiRequest<PriorArtDetail>(`/prior-arts/${priorArtId}`);
}
