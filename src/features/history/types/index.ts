import { MonitoringResult, HealthStatus } from '../../../domain/models';

export interface HistoryFilterState {
  status: HealthStatus | 'ALL';
  dateRange: 'TODAY' | '24H' | '7D' | '30D';
  sortBy: 'NEWEST' | 'OLDEST';
  searchQuery: string;
}

export interface HistoryStatistics {
  totalChecks: number;
  healthyChecks: number;
  failedChecks: number;
  averageResponseTime: number;
  fastestResponse: number;
  slowestResponse: number;
  successRate: number;
  failureRate: number;
}

export type HistoryDateRange = HistoryFilterState['dateRange'];
export type HistorySortOrder = HistoryFilterState['sortBy'];

export type { HistoryFilterState, HistoryStatistics, HistoryDateRange, HistorySortOrder };
