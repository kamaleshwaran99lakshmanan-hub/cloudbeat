/**
 * HttpRequest - Configuration for an HTTP request
 */
export interface HttpRequest {
  /** Request URL */
  readonly url: string;
  /** HTTP method */
  readonly method: 'GET' | 'POST' | 'PUT' | 'PATCH' | 'DELETE';
  /** Request headers */
  readonly headers?: Record<string, string>;
  /** Request body (will be JSON-stringified if an object) */
  readonly body?: unknown;
  /** Request timeout in milliseconds */
  readonly timeout?: number;
}

/**
 * Creates an HttpRequest instance with defaults
 */
export function createHttpRequest(
  url: string,
  method: 'GET' | 'POST' | 'PUT' | 'PATCH' | 'DELETE',
  options?: Partial<Omit<HttpRequest, 'url' | 'method'>>
): HttpRequest {
  return {
    url,
    method,
    headers: options?.headers,
    body: options?.body,
    timeout: options?.timeout,
  };
}
