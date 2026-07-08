import { HttpRequest } from './HttpRequest';
import { HttpResponse } from './HttpResponse';
import { NetworkResult } from './NetworkResult';

/**
 * HttpClient - Abstraction for making HTTP requests
 * 
 * This interface defines the contract for HTTP communication.
 * Implementations can use fetch, Axios, or any other HTTP library.
 * 
 * Why HttpClient is an abstraction:
 * - It decouples the application from specific HTTP implementations
 * - Allows easy testing with mock implementations
 * - Enables swapping the underlying HTTP library without changing business logic
 * 
 * Why fetch is hidden:
 * - Prevents direct coupling to the native fetch API
 * - Centralizes error handling and response transformation
 * - Provides consistent timeout and header management
 * 
 * Why this allows replacing fetch with Axios later:
 * - Only the FetchHttpClient implementation needs to change
 * - All consumers of HttpClient remain unchanged
 * - The interface contract stays the same regardless of implementation
 */
export interface HttpClient {
  /**
   * Execute a generic HTTP request
   */
  request<T>(request: HttpRequest): Promise<NetworkResult<HttpResponse<T>>>;

  /**
   * Execute a GET request
   */
  get<T>(url: string, options?: RequestOptions): Promise<NetworkResult<HttpResponse<T>>>;

  /**
   * Execute a POST request
   */
  post<T>(url: string, body?: unknown, options?: RequestOptions): Promise<NetworkResult<HttpResponse<T>>>;

  /**
   * Execute a PUT request
   */
  put<T>(url: string, body?: unknown, options?: RequestOptions): Promise<NetworkResult<HttpResponse<T>>>;

  /**
   * Execute a PATCH request
   */
  patch<T>(url: string, body?: unknown, options?: RequestOptions): Promise<NetworkResult<HttpResponse<T>>>;

  /**
   * Execute a DELETE request
   */
  delete<T>(url: string, options?: RequestOptions): Promise<NetworkResult<HttpResponse<T>>>;
}

/**
 * Options for simplified HTTP methods
 */
export interface RequestOptions {
  headers?: Record<string, string>;
  timeout?: number;
}
