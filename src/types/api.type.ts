export type ApiFieldError = {
  field: string;
  message: string;
};

export type ApiErrorPayload = {
  status: number;
  code: string;
  message: string;
  errors?: ApiFieldError[];
};

// 공통 응답 포맷: { success, data, error } 로 감싸져서 내려옴
export type ApiResponse<T> = {
  success: boolean;
  data: T | null;
  error: ApiErrorPayload | null;
};
