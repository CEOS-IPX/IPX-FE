import type { ExtractComponentsRequest, ExtractComponentsResponse } from "@/types/search.type";
import { apiRequest } from "./client";

// 구성요소 분해 페이지 ai 자동 추출 버튼 api
export function extractComponents(body: ExtractComponentsRequest) {
  return apiRequest<ExtractComponentsResponse>("/searches/components/extract", {
    method: "POST",
    body,
  });
}
