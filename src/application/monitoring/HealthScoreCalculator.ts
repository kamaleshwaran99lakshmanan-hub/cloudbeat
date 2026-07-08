import { HealthPercentage } from '../../domain/value-objects/HealthPercentage';

/**
 * HealthScoreCalculator - Computes uptime percentage and health scores
 */
export class HealthScoreCalculator {
  /**
   * Calculate uptime percentage based on successful vs total checks
   */
  calculateUptimePercentage(successfulChecks: number, totalChecks: number): HealthPercentage {
    if (totalChecks === 0) {
      return new HealthPercentage(0);
    }
    
    const percentage = (successfulChecks / totalChecks) * 100;
    return new HealthPercentage(Math.min(100, Math.max(0, percentage)));
  }

  /**
   * Calculate health score based on response time and success rate
   */
  calculateHealthScore(
    uptimePercentage: number,
    averageResponseTimeMs: number,
    targetResponseTimeMs: number = 5000
  ): number {
    // Uptime contributes 70% to the score
    const uptimeContribution = uptimePercentage * 0.7;
    
    // Response time contributes 30% to the score
    let responseTimeScore: number;
    if (averageResponseTimeMs <= targetResponseTimeMs) {
      responseTimeScore = 30;
    } else if (averageResponseTimeMs >= targetResponseTimeMs * 2) {
      responseTimeScore = 0;
    } else {
      const ratio = (averageResponseTimeMs - targetResponseTimeMs) / targetResponseTimeMs;
      responseTimeScore = 30 * (1 - ratio);
    }
    
    return Math.min(100, Math.max(0, uptimeContribution + responseTimeScore));
  }

  /**
   * Determine overall health status based on score
   */
  determineHealthStatus(score: number): 'healthy' | 'degraded' | 'unhealthy' {
    if (score >= 90) {
      return 'healthy';
    } else if (score >= 50) {
      return 'degraded';
    } else {
      return 'unhealthy';
    }
  }
}
