import { useState, useEffect, useCallback } from 'react';
import { HistoryViewModel } from '../viewmodels/HistoryViewModel';
import { HistoryFilterState } from '../types';

export function useHistoryFilter(viewModel: HistoryViewModel) {
  const [filterState, setFilterState] = useState<HistoryFilterState>({
    status: 'ALL',
    dateRange: '24H',
    sortBy: 'NEWEST',
    searchQuery: '',
  });

  useEffect(() => {
    const unsubscribe = viewModel.subscribe(() => {
      const state = viewModel.getState();
      setFilterState(state.filterState);
    });

    // Initial sync
    const state = viewModel.getState();
    setFilterState(state.filterState);

    return unsubscribe;
  }, [viewModel]);

  const updateFilter = useCallback(<K extends keyof HistoryFilterState>(key: K, value: HistoryFilterState[K]) => {
    viewModel.updateFilter(key, value);
  }, [viewModel]);

  const resetFilters = useCallback(() => {
    viewModel.updateFilter('status', 'ALL');
    viewModel.updateFilter('dateRange', '24H');
    viewModel.updateFilter('sortBy', 'NEWEST');
    viewModel.updateFilter('searchQuery', '');
  }, [viewModel]);

  return {
    filterState,
    updateFilter,
    resetFilters,
  };
}
