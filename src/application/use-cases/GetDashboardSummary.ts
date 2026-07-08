import { CloudService } from '../../domain/entities/CloudService';
import { HealthHistory } from '../../domain/entities/HealthHistory';
import { CloudServiceRepository } from '../repositories/CloudServiceRepository';
import { HealthHistoryRepository } from '../repositories/HealthHistoryRepository';

export interface DashboardSummary {
  totalServices: number;
  healthyCount: number;
  unhealthyCount: number;
  degradedCount: number;
  offlineCount: number;
  averageHealthPercentage: number;
}

export class GetDashboardSummary {
  constructor(
    private readonly cloudServiceRepository: CloudServiceRepository,
    private readonly healthHistoryRepository: HealthHistoryRepository
  ) {}

  async execute(): Promise<DashboardSummary> {
    const services = await this.cloudServiceRepository.findAll();

    let healthyCount = 0;
    let unhealthyCount = 0;
    let degradedCount = 0;
    let offlineCount = 0;

    for (const service of services) {
      switch (service.status) {
        case 'online':
          healthyCount++;
          break;
        case 'offline':
          offlineCount++;
          break;
        case 'degraded':
          degradedCount++;
          break;
        case 'maintenance':
          unhealthyCount++;
          break;
      }
    }

    const totalServices = services.length;
    const averageHealthPercentage =
      totalServices > 0 ? (healthyCount / totalServices) * 100 : 0;

    return {
      totalServices,
      healthyCount,
      unhealthyCount,
      degradedCount,
      offlineCount,
      averageHealthPercentage,
    };
  }
}
