import { CloudService } from '../../../domain/entities/CloudService';
import { HealthHistory } from '../../../domain/entities/HealthHistory';

export interface DashboardStats {
  totalServices: number;
  healthyServices: number;
  unhealthyServices: number;
  overallHealthPercentage: number;
  averageResponseTime: number;
  lastUpdated: Date;
}

export interface DashboardData {
  stats: DashboardStats;
  recentChecks: HealthHistory[];
  services: CloudService[];
}

export interface DashboardState {
  isLoading: boolean;
  isRefreshing: boolean;
  error: string | null;
  data: DashboardData | null;
}

export type DashboardAction =
  | { type: 'LOAD_START' }
  | { type: 'LOAD_SUCCESS'; payload: DashboardData }
  | { type: 'LOAD_ERROR'; payload: string }
  | { type: 'REFRESH_START' }
  | { type: 'REFRESH_SUCCESS'; payload: DashboardData }
  | { type: 'REFRESH_ERROR'; payload: string };
