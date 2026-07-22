import type {
  GetCasesParams,
  GetCasesResponse,
  UpdateCaseRequest,
  UpdateCaseResponse,
  DeleteCaseResponse,
} from "@/types/case.type";
import { apiRequest } from "./client";

// 내 활동 기록
// 사건 목록 조회 api
export function getCases(params: GetCasesParams = {}) {
  const query = new URLSearchParams();
  if (params.statusGroup) query.set("statusGroup", params.statusGroup);
  if (params.keyword) query.set("keyword", params.keyword);
  if (params.sort) query.set("sort", params.sort);
  if (params.page !== undefined) query.set("page", String(params.page));
  if (params.size !== undefined) query.set("size", String(params.size));

  const queryString = query.toString();
  return apiRequest<GetCasesResponse>(`/cases${queryString ? `?${queryString}` : ""}`);
}

// 수정하기 모달 + 삭제 메뉴
// 사건(사명, 출원인) 수정 api
export function updateCase(caseId: number, body: UpdateCaseRequest) {
  return apiRequest<UpdateCaseResponse>(`/cases/${caseId}`, {
    method: "PATCH",
    body,
  });
}

// 사건 삭제 api
export function deleteCase(caseId: number) {
  return apiRequest<DeleteCaseResponse>(`/cases/${caseId}`, {
    method: "DELETE",
  });
}
