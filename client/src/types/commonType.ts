export interface CommonErrorType {
  error: ErrorType;
}

export interface ErrorType {
  status: number;
  data: Data;
}

export interface Data {
  success: boolean;
  message: string;
}
