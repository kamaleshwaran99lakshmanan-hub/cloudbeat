import { inject, injectable } from 'tsyringe';
import { DashboardData, DashboardStats } from './types';
import { CloudService } from '../../domain/entities/CloudService';
import { HealthHistory } from '../../domain/entities/HealthHistory';
import { GetAllCloudServices } from '../../application/use-cases/GetAllCloudServices';
import { GetHealthHistory } from '../../application/use-cases/GetHealthHistory';

@injectable()
export class DashboardViewModel {
  constructor(
    @inject('GetAllCloudServices') private getAllCloudServices: GetAllCloudServices,
    @inject('GetHealthHistory') private getHealthHistory: GetHealthHistory
  ) {}

  async loadDashboardData(): Promise<DashboardData> {
    const services = await this.getAllCloudServices.execute();
    const healthHistories = await this.getHealthHistory.execute(10);

    const stats = this.calculateStats(services, healthHistories);

    return {
      stats,
      recentChecks: healthHistories,
      services,
    };
  }

  private calculateStats(services: CloudService[], healthHistories: HealthHistory[]): DashboardStats {
    const totalServices = services.length;
    
    const healthyServices = services.filter(s => s.status === 'online').length;
    const unhealthyServices = services.filter(s => s.status === 'offline' || s.status === 'degraded' || s.status === 'maintenance').length;
    
    const overallHealthPercentage = totalServices > 0 
      ? Math.round((healthyServices / totalServices) * 100) 
      : 0;

    // Calculate average response time from all checks in all histories
    let totalResponseTime = 0;
    let checkCount = 0;
    for (const history of healthHistories) {
      for (const check of history.checks) {
        totalResponseTime += check.responseTime.value;
        checkCount++;
      }
    }
    const averageResponseTime = checkCount > 0
      ? Math.round(totalResponseTime / checkCount)
      : 0;

    return {
      totalServices,
      healthyServices,
      unhealthyServices,
      overallHealthPercentage,
      averageResponseTime,
      lastUpdated: new Date(),
    };
  }
}
