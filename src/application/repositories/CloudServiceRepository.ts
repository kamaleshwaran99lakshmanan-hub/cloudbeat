import { CloudService } from '../../domain/entities/CloudService';

export interface CloudServiceRepository {
  create(service: CloudService): Promise<CloudService>;
  update(service: CloudService): Promise<CloudService>;
  delete(id: string): Promise<void>;
  findById(id: string): Promise<CloudService | null>;
  findAll(): Promise<CloudService[]>;
  enableMonitoring(id: string): Promise<CloudService>;
  disableMonitoring(id: string): Promise<CloudService>;
}
