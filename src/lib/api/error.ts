import type { ApiFieldError } from "@/types/api.type";

export class ApiError extends Error {
  status: number;
  errorCode: string;
  errors?: ApiFieldError[];

  constructor(params: {
    status: number;
    errorCode: string;
    message: string;
    errors?: ApiFieldError[];
  }) {
    super(params.message);
    this.name = "ApiError";
    this.status = params.status;
    this.errorCode = params.errorCode;
    this.errors = params.errors;
  }
}
