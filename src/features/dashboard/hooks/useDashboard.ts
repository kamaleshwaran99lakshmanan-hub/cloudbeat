import { useState, useEffect, useCallback } from 'react';
import { container } from '../../core/di/Container';
import { DashboardViewModel } from '../viewmodels/DashboardViewModel';
import { DashboardState, DashboardData } from '../types';
import { createInitialState, dashboardReducer } from '../reducer';

export function useDashboard() {
  const [state, dispatch] = useState<DashboardState>(createInitialState);
  const viewModel = container.resolve(DashboardViewModel);

  const loadData = useCallback(async () => {
    dispatch({ type: 'LOAD_START' });
    try {
      const data = await viewModel.loadDashboardData();
      dispatch({ type: 'LOAD_SUCCESS', payload: data });
    } catch (error) {
      dispatch({ 
        type: 'LOAD_ERROR', 
        payload: error instanceof Error ? error.message : 'Failed to load dashboard' 
      });
    }
  }, [viewModel]);

  const refreshData = useCallback(async () => {
    dispatch({ type: 'REFRESH_START' });
    try {
      const data = await viewModel.loadDashboardData();
      dispatch({ type: 'REFRESH_SUCCESS', payload: data });
    } catch (error) {
      dispatch({ 
        type: 'REFRESH_ERROR', 
        payload: error instanceof Error ? error.message : 'Failed to refresh dashboard' 
      });
    }
  }, [viewModel]);

  useEffect(() => {
    loadData();
  }, [loadData]);

  return {
    ...state,
    refresh: refreshData,
    reload: loadData,
  };
}
