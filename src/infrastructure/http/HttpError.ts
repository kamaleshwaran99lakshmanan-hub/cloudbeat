/**
 * HttpError - Base class for HTTP-related errors
 */
export class HttpError extends Error {
  public readonly status: number;
  public readonly url: string;
  public readonly method: string;

  constructor(
    message: string,
    status: number,
    url: string,
    method: string
  ) {
    super(message);
    this.name = 'HttpError';
    this.status = status;
    this.url = url;
    this.method = method;
  }
}

/**
 * TimeoutError - Thrown when a request exceeds the configured timeout
 */
export class TimeoutError extends HttpError {
  constructor(url: string, method: string, timeoutMs: number) {
    super(
      `Request timed out after ${timeoutMs}ms`,
      408,
      url,
      method
    );
    this.name = 'TimeoutError';
  }
}

/**
 * ConnectionError - Thrown when network connectivity fails
 */
export class ConnectionError extends HttpError {
  constructor(url: string, method: string, originalMessage?: string) {
    super(
      originalMessage ?? 'Network connection failed',
      0,
      url,
      method
    );
    this.name = 'ConnectionError';
  }
}

/**
 * ServerError - Thrown when the server returns a 5xx status code
 */
export class ServerError extends HttpError {
  constructor(url: string, method: string, status: number) {
    super(
      `Server error: ${status}`,
      status,
      url,
      method
    );
    this.name = 'ServerError';
  }
}

/**
 * UnexpectedResponseError - Thrown when the response format is invalid
 */
export class UnexpectedResponseError extends HttpError {
  constructor(
    url: string,
    method: string,
    status: number,
    reason: string
  ) {
    super(
      `Unexpected response: ${reason}`,
      status,
      url,
      method
    );
    this.name = 'UnexpectedResponseError';
  }
}
