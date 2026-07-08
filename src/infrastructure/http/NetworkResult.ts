import { HttpResponse } from './HttpResponse';
import { HttpError } from './HttpError';

/**
 * Success result - contains the successful response data
 */
export interface Success<T> {
  readonly type: 'success';
  readonly data: T;
}

/**
 * Failure result - contains the error that occurred
 */
export interface Failure {
  readonly type: 'failure';
  readonly error: HttpError;
}

/**
 * NetworkResult - Discriminated union for HTTP operation results
 */
export type NetworkResult<T> = Success<T> | Failure;

/**
 * Creates a success result
 */
export function success<T>(data: T): Success<T> {
  return {
    type: 'success',
    data,
  };
}

/**
 * Creates a failure result
 */
export function failure(error: HttpError): Failure {
  return {
    type: 'failure',
    error,
  };
}
