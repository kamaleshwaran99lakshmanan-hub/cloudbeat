import { CloudService } from '../../domain/entities/CloudService';
import { ServiceUrl } from '../../domain/value-objects/ServiceUrl';
import { ServiceStatus } from '../../domain/enums/ServiceStatus';
import { CloudServiceRepository } from '../repositories/CloudServiceRepository';
import { ValidationError } from '../../domain/errors/ValidationError';

export class UpdateCloudService {
  constructor(private readonly cloudServiceRepository: CloudServiceRepository) {}

  async execute(
    id: string,
    name?: string,
    url?: string,
    status?: ServiceStatus
  ): Promise<CloudService> {
    const existing = await this.cloudServiceRepository.findById(id);

    if (!existing) {
      throw new ValidationError(`Cloud service with ID ${id} not found`);
    }

    let updatedService = existing;

    if (name !== undefined || url !== undefined || status !== undefined) {
      const newName = name ?? existing.name;
      const newUrl = url ? new ServiceUrl(url) : existing.url;
      const newStatus = status ?? existing.status;

      updatedService = new CloudService(id, newName, newUrl, newStatus);
    }

    return this.cloudServiceRepository.update(updatedService);
  }
}
