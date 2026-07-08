import { CloudService } from '../../domain/entities/CloudService';
import { CloudServiceRepository } from '../repositories/CloudServiceRepository';
import { ValidationError } from '../../domain/errors/ValidationError';

export class GetCloudServiceById {
  constructor(private readonly cloudServiceRepository: CloudServiceRepository) {}

  async execute(id: string): Promise<CloudService | null> {
    if (!id || id.trim().length === 0) {
      throw new ValidationError('Service ID is required');
    }

    return this.cloudServiceRepository.findById(id);
  }
}
