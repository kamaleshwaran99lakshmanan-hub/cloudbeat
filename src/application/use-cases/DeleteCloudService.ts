import { CloudServiceRepository } from '../repositories/CloudServiceRepository';
import { ValidationError } from '../../domain/errors/ValidationError';

export class DeleteCloudService {
  constructor(private readonly cloudServiceRepository: CloudServiceRepository) {}

  async execute(id: string): Promise<void> {
    if (!id || id.trim().length === 0) {
      throw new ValidationError('Service ID is required');
    }

    const existing = await this.cloudServiceRepository.findById(id);

    if (!existing) {
      throw new ValidationError(`Cloud service with ID ${id} not found`);
    }

    return this.cloudServiceRepository.delete(id);
  }
}
