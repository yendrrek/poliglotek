export interface Response<T> {
  success: boolean;
  error: string;
  warning?: string;
  data: T;
}
