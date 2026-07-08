import { useState, useEffect, useCallback } from 'react';
import { HistoryViewModel } from '../viewmodels/HistoryViewModel';
import { MonitoringResult } from '../../../domain/models';
import { HistoryFilterState, HistoryStatistics } from '../types';

export function useHistory(viewModel: HistoryViewModel) {
  const [state, setState] = useState({
    history: [] as MonitoringResult[],
    filteredHistory: [] as MonitoringResult[],
    isLoading: false,
    error: null as string | null,
    filterState: {
      status: 'ALL' as HealthStatus | 'ALL',
      dateRange: '24H' as 'TODAY' | '24H' | '7D' | '30D',
      sortBy: 'NEWEST' as 'NEWEST' | 'OLDEST',
      searchQuery: '',
    },
    statistics: {
      totalChecks: 0,
      healthyChecks: 0,
      failedChecks: 0,
      averageResponseTime: 0,
      fastestResponse: 0,
      slowestResponse: 0,
      successRate: 0,
      failureRate: 0,
    } as HistoryStatistics,
  });

  useEffect(() => {
    const unsubscribe = viewModel.subscribe(() => {
      setState(viewModel.getState());
    });

    // Initial state sync
    setState(viewModel.getState());

    return unsubscribe;
  }, [viewModel]);

  const loadHistory = useCallback(async () => {
    await viewModel.loadHistory();
  }, [viewModel]);

  const updateFilter = useCallback(<K extends keyof HistoryFilterState>(key: K, value: HistoryFilterState[K]) => {
    viewModel.updateFilter(key, value);
  }, [viewModel]);

  const refresh = useCallback(async () => {
    await viewModel.refresh();
  }, [viewModel]);

  return {
    ...state,
    loadHistory,
    updateFilter,
    refresh,
  };
}
