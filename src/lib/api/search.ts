import type {
  ExtractComponentsRequest,
  ExtractComponentsResponse,
  StartSearchRequest,
  StartSearchResponse,
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
