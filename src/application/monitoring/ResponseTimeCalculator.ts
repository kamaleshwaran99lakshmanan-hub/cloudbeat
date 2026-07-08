import { ResponseTime } from '../../domain/value-objects/ResponseTime';

/**
 * ResponseTimeCalculator - Calculates response duration for health checks
 */
export class ResponseTimeCalculator {
  /**
   * Calculate response time in milliseconds
   */
  calculate(startTime: number, endTime: number): ResponseTime {
    const durationMs = Math.max(0, endTime - startTime);
    return new ResponseTime(durationMs);
  }

  /**
   * Calculate average response time from an array of durations
   */
  calculateAverage(responseTimesMs: number[]): number {
    if (responseTimesMs.length === 0) {
      return 0;
    }
    const total = responseTimesMs.reduce((sum, time) => sum + time, 0);
    return total / responseTimesMs.length;
  }

  /**
   * Find minimum response time from an array
   */
  findMinimum(responseTimesMs: number[]): number {
    if (responseTimesMs.length === 0) {
      return 0;
    }
    return Math.min(...responseTimesMs);
  }

  /**
   * Find maximum response time from an array
   */
  findMaximum(responseTimesMs: number[]): number {
    if (responseTimesMs.length === 0) {
      return 0;
    }
    return Math.max(...responseTimesMs);
  }
}
