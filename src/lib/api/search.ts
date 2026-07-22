import type {
  ExtractComponentsRequest,
  ExtractComponentsResponse,
  StartSearchRequest,
  StartSearchResponse,
  SearchStatusResponse,
  CancelSearchResponse,
  GetPriorArtsResponse,
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

// 선행기술 탐색 결과 페이지
// 사건별 선행문헌 목록 조회
export function getPriorArts(caseId: number) {
  return apiRequest<GetPriorArtsResponse>(`/cases/${caseId}/prior-arts`);
}
