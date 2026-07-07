import { HealthCheck } from '../../domain/entities/HealthCheck';

export interface HealthHistoryRepository {
  save(record: HealthCheck): Promise<HealthCheck>;
  saveMany(records: HealthCheck[]): Promise<HealthCheck[]>;
  findByService(serviceId: string): Promise<HealthCheck[]>;
  findLatest(serviceId: string): Promise<HealthCheck | null>;
  findBetween(serviceId: string, from: Date, to: Date): Promise<HealthCheck[]>;
  deleteOlderThan(date: Date): Promise<void>;
}
