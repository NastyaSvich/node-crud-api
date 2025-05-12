import { ServerResponse } from 'http';
import {
  ResponseResultError,
  ResponseResultSuccess,
} from '../models/ResponseResult';

export const setResponse = <T>(
  res: ServerResponse,
  result: ResponseResultSuccess<T> | ResponseResultError,
) => {
  res.writeHead(result.status, { 'Content-Type': 'application/json' });
  if (result.status !== 204) {
    res.end(JSON.stringify(result.body));
  } else {
    res.end();
  }
};

export const responseErrors: ResponseErrors = {
  BAD_ID: () => ({ status: 400, body: { message: 'Invalid ID format' } }),
  ENF: () => ({ status: 404, body: { message: 'Endpoint not found' } }),
  NF: () => ({ status: 404, body: { message: 'User not found' } }),
  MRF: () => ({ status: 400, body: { message: 'Missing required fields' } }),
  MNA: () => ({ status: 405, body: { message: 'Method not allowed' } }),
  ISE: () => ({ status: 500, body: { message: 'Internal Server Error' } }),
};

export const responseSuccess: ResponseSuccess = {
  OK: <T>(data: T) => ({ status: 200, body: data }),
  CREATE: <T>(data: T) => ({ status: 201, body: data }),
  DELETE: () => ({ status: 204 }),
};

export type ResponseErrors = {
  BAD_ID: () => ResponseResultError;
  ENF: () => ResponseResultError;
  NF: () => ResponseResultError;
  MRF: () => ResponseResultError;
  MNA: () => ResponseResultError;
  ISE: () => ResponseResultError;
};

export type ResponseSuccess = {
  OK: <T>(data: T) => ResponseResultSuccess<T>;
  CREATE: <T>(data: T) => ResponseResultSuccess<T>;
  DELETE: () => ResponseResultSuccess<undefined>;
};
