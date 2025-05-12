export interface ResponseResult<T> {
  status: number;
  body?: T;
}

export type ResponseResultSuccess<T> = ResponseResult<T>;

export type ResponseResultError = ResponseResult<{ message: string }>;
