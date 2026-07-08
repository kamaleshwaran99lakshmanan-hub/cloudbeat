import { HealthHistory } from '../../domain/entities/HealthHistory';
import { HealthCheck } from '../../domain/entities/HealthCheck';
import { HealthHistoryRepository } from '../repositories/HealthHistoryRepository';
import { ValidationError } from '../../domain/errors/ValidationError';

export class GetHealthHistory {
  constructor(private readonly healthHistoryRepository: HealthHistoryRepository) {}

  async execute(serviceId: string): Promise<HealthHistory> {
    if (!serviceId || serviceId.trim().length === 0) {
      throw new ValidationError('Service ID is required');
    }

    const checks = await this.healthHistoryRepository.findByService(serviceId);

    return new HealthHistory(serviceId, checks);
  }
}
