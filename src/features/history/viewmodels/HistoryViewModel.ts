import { MonitoringResult, HealthStatus } from '../../../domain/models';
import { GetMonitoringHistoryUseCase } from '../../../application/usecases';
import { HistoryFilterState, HistoryStatistics } from '../types';

export class HistoryViewModel {
  private getMonitoringHistoryUseCase: GetMonitoringHistoryUseCase;
  private listeners: Set<() => void> = new Set();
  
  private history: MonitoringResult[] = [];
  private filteredHistory: MonitoringResult[] = [];
  private isLoading: boolean = false;
  private error: string | null = null;
  private filterState: HistoryFilterState = {
    status: 'ALL',
    dateRange: '24H',
    sortBy: 'NEWEST',
    searchQuery: '',
  };

  constructor(getMonitoringHistoryUseCase: GetMonitoringHistoryUseCase) {
    this.getMonitoringHistoryUseCase = getMonitoringHistoryUseCase;
  }

  subscribe(listener: () => void): () => void {
    this.listeners.add(listener);
    return () => this.listeners.delete(listener);
  }

  notify(): void {
    this.listeners.forEach(listener => listener());
  }

  getState(): {
    history: MonitoringResult[];
    filteredHistory: MonitoringResult[];
    isLoading: boolean;
    error: string | null;
    filterState: HistoryFilterState;
    statistics: HistoryStatistics;
  } {
    return {
      history: this.history,
      filteredHistory: this.filteredHistory,
      isLoading: this.isLoading,
      error: this.error,
      filterState: this.filterState,
      statistics: this.calculateStatistics(),
    };
  }

  async loadHistory(): Promise<void> {
    this.isLoading = true;
    this.error = null;
    this.notify();

    try {
      const results = await this.getMonitoringHistoryUseCase.execute();
      this.history = results;
      this.applyFilters();
    } catch (err) {
      this.error = err instanceof Error ? err.message : 'Failed to load history';
      this.filteredHistory = [];
    } finally {
      this.isLoading = false;
      this.notify();
    }
  }

  updateFilter<K extends keyof HistoryFilterState>(key: K, value: HistoryFilterState[K]): void {
    this.filterState = { ...this.filterState, [key]: value };
    this.applyFilters();
    this.notify();
  }

  private applyFilters(): void {
    let filtered = [...this.history];

    // Filter by status
    if (this.filterState.status !== 'ALL') {
      filtered = filtered.filter(result => result.status === this.filterState.status);
    }

    // Filter by date range
    const now = new Date();
    const cutoffDate = this.getCutoffDate(this.filterState.dateRange, now);
    filtered = filtered.filter(result => new Date(result.timestamp) >= cutoffDate);

    // Filter by search query
    if (this.filterState.searchQuery.trim()) {
      const query = this.filterState.searchQuery.toLowerCase();
      filtered = filtered.filter(result => 
        result.serviceName.toLowerCase().includes(query)
      );
    }

    // Sort
    filtered.sort((a, b) => {
      const timeA = new Date(a.timestamp).getTime();
      const timeB = new Date(b.timestamp).getTime();
      return this.filterState.sortBy === 'NEWEST' ? timeB - timeA : timeA - timeB;
    });

    this.filteredHistory = filtered;
  }

  private getCutoffDate(dateRange: HistoryFilterState['dateRange'], now: Date): Date {
    switch (dateRange) {
      case 'TODAY':
        return new Date(now.setHours(0, 0, 0, 0));
      case '24H':
        return new Date(now.getTime() - 24 * 60 * 60 * 1000);
      case '7D':
        return new Date(now.getTime() - 7 * 24 * 60 * 60 * 1000);
      case '30D':
        return new Date(now.getTime() - 30 * 24 * 60 * 60 * 1000);
      default:
        return new Date(now.getTime() - 24 * 60 * 60 * 1000);
    }
  }

  private calculateStatistics(): HistoryStatistics {
    const results = this.filteredHistory;
    const total = results.length;
    
    if (total === 0) {
      return {
        totalChecks: 0,
        healthyChecks: 0,
        failedChecks: 0,
        averageResponseTime: 0,
        fastestResponse: 0,
        slowestResponse: 0,
        successRate: 0,
        failureRate: 0,
      };
    }

    const healthyChecks = results.filter(r => r.status === 'HEALTHY').length;
    const failedChecks = results.filter(r => r.status === 'UNHEALTHY').length;
    
    const responseTimes = results.map(r => r.responseTime).filter(t => t !== undefined && t !== null) as number[];
    const avgResponseTime = responseTimes.length > 0 
      ? responseTimes.reduce((sum, t) => sum + t, 0) / responseTimes.length 
      : 0;
    const fastestResponse = responseTimes.length > 0 ? Math.min(...responseTimes) : 0;
    const slowestResponse = responseTimes.length > 0 ? Math.max(...responseTimes) : 0;

    const successRate = total > 0 ? (healthyChecks / total) * 100 : 0;
    const failureRate = total > 0 ? (failedChecks / total) * 100 : 0;

    return {
      totalChecks: total,
      healthyChecks,
      failedChecks,
      averageResponseTime: Math.round(avgResponseTime),
      fastestResponse,
      slowestResponse,
      successRate: Math.round(successRate * 100) / 100,
      failureRate: Math.round(failureRate * 100) / 100,
    };
  }

  refresh(): Promise<void> {
    return this.loadHistory();
  }
}
