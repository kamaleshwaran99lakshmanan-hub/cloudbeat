import { CloudService } from '../../domain/entities/CloudService';
import { ServiceUrl } from '../../domain/value-objects/ServiceUrl';
import { ServiceStatus } from '../../domain/enums/ServiceStatus';
import { CloudServiceRepository } from '../repositories/CloudServiceRepository';
import { ValidationError } from '../../domain/errors/ValidationError';

export class AddCloudService {
  constructor(private readonly cloudServiceRepository: CloudServiceRepository) {}

  async execute(
    id: string,
    name: string,
    url: string,
    status: ServiceStatus = ServiceStatus.ONLINE
  ): Promise<CloudService> {
    if (!id || id.trim().length === 0) {
      throw new ValidationError('Service ID is required');
    }

    if (!name || name.trim().length === 0) {
      throw new ValidationError('Service name is required');
    }

    const serviceUrl = new ServiceUrl(url);

    const service = new CloudService(id, name, serviceUrl, status);

    return this.cloudServiceRepository.create(service);
  }
}
