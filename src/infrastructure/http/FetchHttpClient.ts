import { HttpClient, RequestOptions } from './HttpClient';
import { HttpRequest, createHttpRequest } from './HttpRequest';
import { HttpResponse, createHttpResponse } from './HttpResponse';
import { NetworkResult, success, failure } from './NetworkResult';
import {
  HttpError,
  TimeoutError,
  ConnectionError,
  ServerError,
  UnexpectedResponseError,
} from './HttpError';

/**
 * FetchHttpClient - Implementation of HttpClient using the native fetch API
 * 
 * This implementation:
 * - Uses the native fetch() API internally
 * - Supports configurable timeouts via AbortController
 * - Handles JSON parsing and serialization
 * - Maps HTTP errors to appropriate error types
 * - Validates HTTP status codes
 * 
 * Why Infrastructure should never depend on UI:
 * - Infrastructure is a lower layer that should be reusable across contexts
 * - UI frameworks may change; infrastructure should remain stable
 * - Testing infrastructure without UI dependencies is simpler
 * - Prevents circular dependencies in the architecture
 */
export class FetchHttpClient implements HttpClient {
  private readonly defaultTimeout: number;
  private readonly defaultHeaders: Record<string, string>;

  constructor(
    defaultTimeout: number = 30000,
    defaultHeaders: Record<string, string> = {}
  ) {
    this.defaultTimeout = defaultTimeout;
    this.defaultHeaders = defaultHeaders;
  }

  async request<T>(request: HttpRequest): Promise<NetworkResult<HttpResponse<T>>> {
    const timeout = request.timeout ?? this.defaultTimeout;
    const controller = new AbortController();
    const timeoutId = setTimeout(() => controller.abort(), timeout);

    try {
      const headers = this.buildHeaders(request.headers);
      let body: string | undefined;

      if (request.body !== undefined && request.method !== 'GET') {
        if (typeof request.body === 'string') {
          body = request.body;
        } else {
          body = JSON.stringify(request.body);
          if (!headers['Content-Type']) {
            headers['Content-Type'] = 'application/json';
          }
        }
      }

      const response = await fetch(request.url, {
        method: request.method,
        headers,
        body,
        signal: controller.signal,
      });

      clearTimeout(timeoutId);

      // Parse response body
      let parsedBody: T | null = null;
      const contentType = response.headers.get('content-type');

      if (contentType?.includes('application/json')) {
        try {
          const text = await response.text();
          parsedBody = text ? (JSON.parse(text) as T) : null;
        } catch (parseError) {
          return failure(
            new UnexpectedResponseError(
              request.url,
              request.method,
              response.status,
              'Failed to parse JSON response'
            )
          );
        }
      } else if (contentType) {
        // For non-JSON responses, try to get as text
        try {
          const text = await response.text();
          parsedBody = text as unknown as T;
        } catch {
          parsedBody = null;
        }
      }

      // Check for server errors (5xx)
      if (response.status >= 500) {
        return failure(new ServerError(request.url, request.method, response.status));
      }

      // Build response headers
      const responseHeaders: Record<string, string> = {};
      response.headers.forEach((value, key) => {
        responseHeaders[key] = value;
      });

      const httpResponse = createHttpResponse<T>(
        response.status,
        responseHeaders,
        parsedBody
      );

      return success(httpResponse);
    } catch (error) {
      clearTimeout(timeoutId);

      // Handle abort (timeout)
      if (error instanceof Error && error.name === 'AbortError') {
        return failure(new TimeoutError(request.url, request.method, timeout));
      }

      // Handle network/connection errors
      if (error instanceof TypeError && error.message.includes('fetch')) {
        return failure(new ConnectionError(request.url, request.method, error.message));
      }

      // Handle other connection-related errors
      if (error instanceof Error && 
          (error.message.includes('network') || 
           error.message.includes('connection') ||
           error.message.includes('Failed to fetch'))) {
        return failure(new ConnectionError(request.url, request.method, error.message));
      }

      // Unexpected error
      return failure(
        new UnexpectedResponseError(
          request.url,
          request.method,
          0,
          error instanceof Error ? error.message : 'Unknown error'
        )
      );
    }
  }

  async get<T>(url: string, options?: RequestOptions): Promise<NetworkResult<HttpResponse<T>>> {
    return this.request<T>(
      createHttpRequest(url, 'GET', {
        headers: options?.headers,
        timeout: options?.timeout,
      })
    );
  }

  async post<T>(url: string, body?: unknown, options?: RequestOptions): Promise<NetworkResult<HttpResponse<T>>> {
    return this.request<T>(
      createHttpRequest(url, 'POST', {
        headers: options?.headers,
        body,
        timeout: options?.timeout,
      })
    );
  }

  async put<T>(url: string, body?: unknown, options?: RequestOptions): Promise<NetworkResult<HttpResponse<T>>> {
    return this.request<T>(
      createHttpRequest(url, 'PUT', {
        headers: options?.headers,
        body,
        timeout: options?.timeout,
      })
    );
  }

  async patch<T>(url: string, body?: unknown, options?: RequestOptions): Promise<NetworkResult<HttpResponse<T>>> {
    return this.request<T>(
      createHttpRequest(url, 'PATCH', {
        headers: options?.headers,
        body,
        timeout: options?.timeout,
      })
    );
  }

  async delete<T>(url: string, options?: RequestOptions): Promise<NetworkResult<HttpResponse<T>>> {
    return this.request<T>(
      createHttpRequest(url, 'DELETE', {
        headers: options?.headers,
        timeout: options?.timeout,
      })
    );
  }

  private buildHeaders(customHeaders?: Record<string, string>): Record<string, string> {
    const headers = { ...this.defaultHeaders };
    
    if (customHeaders) {
      Object.assign(headers, customHeaders);
    }
    
    return headers;
  }
}
