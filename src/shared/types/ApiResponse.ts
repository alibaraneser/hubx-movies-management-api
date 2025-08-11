export interface ApiResponse<T, E = unknown> {
  success: boolean;
  message?: string;
  data: T | null;
  error?: E;
}
