/**
 * MonitoringStatistics - Calculates monitoring statistics
 */
export interface MonitoringStatistics {
  readonly totalChecks: number;
  readonly successfulChecks: number;
  readonly failedChecks: number;
  readonly successRate: number;
  readonly failureRate: number;
  readonly averageResponseTimeMs: number;
  readonly minResponseTimeMs: number;
  readonly maxResponseTimeMs: number;
}

/**
 * Creates a MonitoringStatistics instance
 */
export function createMonitoringStatistics(
  totalChecks: number,
  successfulChecks: number,
  failedChecks: number,
  successRate: number,
  failureRate: number,
  averageResponseTimeMs: number,
  minResponseTimeMs: number,
  maxResponseTimeMs: number
): MonitoringStatistics {
  return {
    totalChecks,
    successfulChecks,
    failedChecks,
    successRate,
    failureRate,
    averageResponseTimeMs,
    minResponseTimeMs,
    maxResponseTimeMs,
  };
}
