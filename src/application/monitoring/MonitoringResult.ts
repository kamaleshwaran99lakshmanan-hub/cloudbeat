import { HealthStatus } from '../../domain/enums/HealthStatus';

/**
 * MonitoringResult - Represents the result of a monitoring operation
 */
export interface MonitoringResult {
  readonly serviceId: string;
  readonly timestamp: Date;
  readonly status: HealthStatus;
  readonly responseTimeMs: number;
  readonly statusCode?: number;
  readonly errorMessage?: string;
  readonly attemptNumber: number;
}

/**
 * Creates a MonitoringResult instance
 */
export function createMonitoringResult(
  serviceId: string,
  timestamp: Date,
  status: HealthStatus,
  responseTimeMs: number,
  statusCode?: number,
  errorMessage?: string,
  attemptNumber: number = 1
): MonitoringResult {
  return {
    serviceId,
    timestamp,
    status,
    responseTimeMs,
    statusCode,
    errorMessage,
    attemptNumber,
  };
}
