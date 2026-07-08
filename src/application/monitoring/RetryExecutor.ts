import { RetryPolicy } from '../../domain/value-objects/RetryPolicy';

/**
 * RetryExecutor - Executes operations with retry logic
 */
export class RetryExecutor {
  /**
   * Execute an operation with retry support
   * @param operation - The async operation to execute
   * @param retryPolicy - The retry policy configuration
   * @returns The result of the successful operation or throws after all retries fail
   */
  async execute<T>(
    operation: () => Promise<T>,
    retryPolicy: RetryPolicy
  ): Promise<T> {
    let lastError: Error | undefined;

    for (let attempt = 0; attempt <= retryPolicy.maxRetries; attempt++) {
      try {
        return await operation();
      } catch (error) {
        lastError = error instanceof Error ? error : new Error(String(error));

        // If this was the last attempt, rethrow
        if (attempt === retryPolicy.maxRetries) {
          break;
        }

        // Wait before next retry using exponential backoff
        const delayMs = retryPolicy.getDelayForAttempt(attempt);
        await this.sleep(delayMs);
      }
    }

    throw lastError ?? new Error('Operation failed after all retries');
  }

  /**
   * Sleep for the specified duration
   */
  private sleep(ms: number): Promise<void> {
    return new Promise(resolve => setTimeout(resolve, ms));
  }

  /**
   * Execute an operation and return success/failure status instead of throwing
   * @param operation - The async operation to execute
   * @param retryPolicy - The retry policy configuration
   * @returns Object with success flag and either result or error
   */
  async executeWithResult<T>(
    operation: () => Promise<T>,
    retryPolicy: RetryPolicy
  ): Promise<{ success: true; result: T } | { success: false; error: Error }> {
    try {
      const result = await this.execute(operation, retryPolicy);
      return { success: true, result };
    } catch (error) {
      return {
        success: false,
        error: error instanceof Error ? error : new Error(String(error)),
      };
    }
  }
}
