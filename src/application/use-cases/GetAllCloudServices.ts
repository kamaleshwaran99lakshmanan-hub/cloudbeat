import { CloudService } from '../../domain/entities/CloudService';
import { CloudServiceRepository } from '../repositories/CloudServiceRepository';

export class GetAllCloudServices {
  constructor(private readonly cloudServiceRepository: CloudServiceRepository) {}

  async execute(): Promise<CloudService[]> {
    return this.cloudServiceRepository.findAll();
  }
}
