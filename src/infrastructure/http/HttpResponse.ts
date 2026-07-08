/**
 * HttpResponse - Represents a successful HTTP response
 */
export interface HttpResponse<T = unknown> {
  /** HTTP status code */
  readonly status: number;
  /** Response headers */
  readonly headers: Record<string, string>;
  /** Parsed response body */
  readonly body: T | null;
  /** Whether the request was successful (status 2xx) */
  readonly success: boolean;
}

/**
 * Creates an HttpResponse instance
 */
export function createHttpResponse<T>(
  status: number,
  headers: Record<string, string>,
  body: T | null
): HttpResponse<T> {
  return {
    status,
    headers,
    body,
    success: status >= 200 && status < 300,
  };
}
