export type ApiFieldError = {
  field: string;
  message: string;
};

export type ApiResponse<T> = {
  success: boolean;
  data: T;
  message: string;
  errorCode?: string;
  errors?: ApiFieldError[];
};
