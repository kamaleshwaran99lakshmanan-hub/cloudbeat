import { HttpClient } from '../../infrastructure/http/HttpClient';
import { ResponseTimeCalculator } from './ResponseTimeCalculator';
import { CloudService } from '../../domain/entities/CloudService';
import { HealthStatus } from '../../domain/enums/HealthStatus';

/**
 * HealthChecker - Executes health checks for cloud services
 */
export interface HealthCheckResult {
  readonly status: HealthStatus;
  readonly statusCode?: number;
  readonly errorMessage?: string;
}

/**
 * HealthChecker - Executes a health check against a cloud service
 */
export class HealthChecker {
  private readonly httpClient: HttpClient;
  private readonly responseTimeCalculator: ResponseTimeCalculator;

  constructor(httpClient: HttpClient, responseTimeCalculator: ResponseTimeCalculator) {
    this.httpClient = httpClient;
    this.responseTimeCalculator = responseTimeCalculator;
  }

  /**
   * Execute a health check for a cloud service
   * @param service - The cloud service to check
   * @returns HealthCheckResult with status and metadata
   */
  async check(service: CloudService): Promise<HealthCheckResult> {
    const startTime = Date.now();
    
    try {
      const result = await this.httpClient.get(service.url.toString(), {
        timeout: 5000,
      });

      const endTime = Date.now();
      
      if (result.isSuccess) {
        const response = result.value;
        
        // Consider 2xx and 3xx as healthy
        if (response.status >= 200 && response.status < 400) {
          return {
            status: HealthStatus.HEALTHY,
            statusCode: response.status,
          };
        } else {
          return {
            status: HealthStatus.UNHEALTHY,
            statusCode: response.status,
            errorMessage: `HTTP ${response.status}`,
          };
        }
      } else {
        // Request failed (network error, timeout, etc.)
        return {
          status: HealthStatus.UNHEALTHY,
          errorMessage: result.error.message,
        };
      }
    } catch (error) {
      return {
        status: HealthStatus.UNHEALTHY,
        errorMessage: error instanceof Error ? error.message : 'Unknown error',
      };
    }
  }
}
