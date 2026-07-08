import { DashboardData, DashboardState, DashboardAction } from './types';

export function dashboardReducer(state: DashboardState, action: DashboardAction): DashboardState {
  switch (action.type) {
    case 'LOAD_START':
      return {
        ...state,
        isLoading: true,
        error: null,
      };

    case 'LOAD_SUCCESS':
      return {
        ...state,
        isLoading: false,
        data: action.payload,
        error: null,
      };

    case 'LOAD_ERROR':
      return {
        ...state,
        isLoading: false,
        error: action.payload,
      };

    case 'REFRESH_START':
      return {
        ...state,
        isRefreshing: true,
        error: null,
      };

    case 'REFRESH_SUCCESS':
      return {
        ...state,
        isRefreshing: false,
        data: action.payload,
        error: null,
      };

    case 'REFRESH_ERROR':
      return {
        ...state,
        isRefreshing: false,
        error: action.payload,
      };

    default:
      return state;
  }
}

export function createInitialState(): DashboardState {
  return {
    isLoading: true,
    isRefreshing: false,
    error: null,
    data: null,
  };
}
