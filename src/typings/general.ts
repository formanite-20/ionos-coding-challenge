export interface ErrorResponse {
  message: string;
  statusCode?: number;
}

export type ThunkAPIConfig = { rejectValue: ErrorResponse };