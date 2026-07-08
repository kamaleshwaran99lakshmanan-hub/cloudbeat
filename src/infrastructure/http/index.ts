/**
 * HTTP Infrastructure Module
 * 
 * This module provides a reusable HTTP client abstraction layer.
 * 
 * Architecture Explanation:
 * 
 * 1. Why HttpClient is an abstraction:
 *    - It defines a contract for HTTP communication without tying to a specific implementation
 *    - Consumers depend on the interface, not the concrete implementation
 *    - Enables dependency injection and easier unit testing with mocks
 * 
 * 2. Why fetch is hidden:
 *    - Direct fetch() calls scattered throughout the codebase create maintenance issues
 *    - Centralizing fetch usage allows consistent error handling, timeout management, and logging
 *    - Provides a single point of change if HTTP behavior needs modification
 * 
 * 3. Why this allows replacing fetch with Axios later:
 *    - Only FetchHttpClient.ts would need to be replaced or modified
 *    - All code using HttpClient interface remains unchanged
 *    - The NetworkResult<T> return type provides consistent error handling regardless of library
 * 
 * 4. Why Infrastructure should never depend on UI:
 *    - Infrastructure is a foundational layer used by domain and presentation layers
 *    - UI frameworks (React, React Native, etc.) are implementation details that may change
 *    - Keeping infrastructure pure enables reuse in non-UI contexts (workers, scripts, tests)
 *    - Prevents circular dependencies and maintains clean architecture boundaries
 */

export { HttpClient, RequestOptions } from './HttpClient';
export { FetchHttpClient } from './FetchHttpClient';
export { HttpRequest, createHttpRequest } from './HttpRequest';
export { HttpResponse, createHttpResponse } from './HttpResponse';
export { NetworkResult, Success, Failure, success, failure } from './NetworkResult';
export {
  HttpError,
  TimeoutError,
  ConnectionError,
  ServerError,
  UnexpectedResponseError,
} from './HttpError';
