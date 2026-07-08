import { HttpClient } from '../../infrastructure/http/HttpClient';
import { HealthChecker } from './HealthChecker';
import { RetryExecutor } from './RetryExecutor';
import { ResponseTimeCalculator } from './ResponseTimeCalculator';
import { HealthScoreCalculator } from './HealthScoreCalculator';
import { MonitoringResult, createMonitoringResult } from './MonitoringResult';
import { CloudService } from '../../domain/entities/CloudService';
import { HealthCheck } from '../../domain/entities/HealthCheck';
import { HealthStatus } from '../../domain/enums/HealthStatus';
import { ResponseTime } from '../../domain/value-objects/ResponseTime';
import { RetryPolicy } from '../../domain/value-objects/RetryPolicy';
import { HealthHistoryRepository } from '../repositories/HealthHistoryRepository';

/**
 * MonitoringEngine - Coordinates the monitoring workflow for cloud services
 * 
 * Why Monitoring Engine belongs to Application Layer:
 * - It orchestrates domain objects and repository interfaces
 * - It contains business logic for how monitoring should work
 * - It doesn't know about UI or specific infrastructure implementations
 * - It uses constructor injection for all dependencies
 * 
 * Why HttpClient is injected:
 * - Allows different HTTP implementations (fetch, Axios, etc.)
 * - Makes testing easier with mock HTTP clients
 * - Follows dependency inversion principle
 * 
 * Why Infrastructure should never leak into Application:
 * - Keeps business logic independent of implementation details
 * - Allows changing infrastructure without affecting application logic
 * - Enables better testability with mocks
 */
export class MonitoringEngine {
  private readonly httpClient: HttpClient;
  private readonly healthChecker: HealthChecker;
  private readonly retryExecutor: RetryExecutor;
  private readonly responseTimeCalculator: ResponseTimeCalculator;
  private readonly healthScoreCalculator: HealthScoreCalculator;
  private readonly healthHistoryRepository: HealthHistoryRepository;

  constructor(
    httpClient: HttpClient,
    healthHistoryRepository: HealthHistoryRepository,
    defaultRetryPolicy?: RetryPolicy
  ) {
    this.httpClient = httpClient;
    this.healthHistoryRepository = healthHistoryRepository;
    this.retryExecutor = new RetryExecutor();
    this.responseTimeCalculator = new ResponseTimeCalculator();
    this.healthScoreCalculator = new HealthScoreCalculator();
    this.healthChecker = new HealthChecker(httpClient, this.responseTimeCalculator);
  }

  /**
   * Execute a health check for a single cloud service
   */
  async checkService(service: CloudService, retryPolicy?: RetryPolicy): Promise<MonitoringResult> {
    const policy = retryPolicy ?? new RetryPolicy(3, 1000, 2);
    
    const startTime = Date.now();
    
    const result = await this.retryExecutor.executeWithResult(
      () => this.healthChecker.check(service),
      policy
    );

    const endTime = Date.now();
    const responseTime = this.responseTimeCalculator.calculate(startTime, endTime);

    if (result.success) {
      const checkResult = result.result;
      
      // Save the health check to history
      const healthCheck = new HealthCheck(
        service.id,
        new Date(),
        checkResult.status,
        responseTime
      );
      
      await this.healthHistoryRepository.save(healthCheck);

      return createMonitoringResult(
        service.id,
        new Date(),
        checkResult.status,
        responseTime.milliseconds,
        checkResult.statusCode,
        undefined,
        1
      );
    } else {
      return createMonitoringResult(
        service.id,
        new Date(),
        HealthStatus.UNHEALTHY,
        responseTime.milliseconds,
        undefined,
        result.error.message,
        policy.maxRetries + 1
      );
    }
  }

  /**
   * Execute health checks for multiple cloud services
   */
  async checkAllServices(
    services: CloudService[],
    retryPolicy?: RetryPolicy
  ): Promise<MonitoringResult[]> {
    const results: MonitoringResult[] = [];

    for (const service of services) {
      const result = await this.checkService(service, retryPolicy);
      results.push(result);
    }

    return results;
  }

  /**
   * Calculate statistics for a set of monitoring results
   */
  calculateStatistics(results: MonitoringResult[]) {
    const totalChecks = results.length;
    const successfulChecks = results.filter(r => r.status === HealthStatus.HEALTHY).length;
    const failedChecks = totalChecks - successfulChecks;
    
    const successRate = totalChecks > 0 ? (successfulChecks / totalChecks) * 100 : 0;
    const failureRate = totalChecks > 0 ? (failedChecks / totalChecks) * 100 : 0;
    
    const responseTimes = results.map(r => r.responseTimeMs);
    const averageResponseTime = this.responseTimeCalculator.calculateAverage(responseTimes);
    const minResponseTime = this.responseTimeCalculator.findMinimum(responseTimes);
    const maxResponseTime = this.responseTimeCalculator.findMaximum(responseTimes);

    return {
      totalChecks,
      successfulChecks,
      failedChecks,
      successRate,
      failureRate,
      averageResponseTime,
      minResponseTime,
      maxResponseTime,
    };
  }

  /**
   * Get the current health score for a service based on its history
   */
  async getServiceHealthScore(serviceId: string): Promise<number> {
    const history = await this.healthHistoryRepository.findByService(serviceId);
    
    if (history.length === 0) {
      return 0;
    }

    const successfulChecks = history.filter(h => h.status === HealthStatus.HEALTHY).length;
    const uptimePercentage = this.healthScoreCalculator.calculateUptimePercentage(
      successfulChecks,
      history.length
    );

    const responseTimes = history.map(h => h.responseTime.milliseconds);
    const averageResponseTime = this.responseTimeCalculator.calculateAverage(responseTimes);

    return this.healthScoreCalculator.calculateHealthScore(
      uptimePercentage.percentage,
      averageResponseTime
    );
  }
}
