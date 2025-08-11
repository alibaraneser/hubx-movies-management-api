export class ApiResponse<T, E = unknown, M = Record<string, unknown>> {
  success: boolean;
  message?: string;
  data?: T;
  error?: E;
  meta?: M;

  private constructor(
    success: boolean,
    message?: string,
    data?: T,
    error?: E,
    meta?: M,
  ) {
    this.success = success;
    this.message = message;
    this.data = data;
    this.error = error;
    this.meta = meta;
  }

  static success<T, M = Record<string, unknown>>(
    data?: T,
    message?: string,
    meta?: M,
  ): ApiResponse<T, undefined, M> {
    return new ApiResponse<T, undefined, M>(
      true,
      message,
      data,
      undefined,
      meta,
    );
  }

  static fail<E = unknown, M = Record<string, unknown>>(
    message: string,
    error?: E,
    meta?: M,
  ): ApiResponse<null, E, M> {
    return new ApiResponse<null, E, M>(false, message, null, error, meta);
  }
}
