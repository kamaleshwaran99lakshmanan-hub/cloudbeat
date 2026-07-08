import { CloudServiceRepository } from '../../../application/repositories/CloudServiceRepository';
import { CloudService } from '../../../domain/entities/CloudService';
import { AsyncStorageClient, StorageKeys } from '../../storage';
import { CloudServiceMapper, CloudServiceStorageModel } from '../../mappers';

export class AsyncCloudServiceRepository implements CloudServiceRepository {
  private readonly storage: AsyncStorageClient;

  constructor(storage?: AsyncStorageClient) {
    this.storage = storage ?? new AsyncStorageClient();
  }

  async create(service: CloudService): Promise<void> {
    const services = await this.findAll();
    services.push(service);
    await this.persistServices(services);
  }

  async update(service: CloudService): Promise<void> {
    const services = await this.findAll();
    const index = services.findIndex(s => s.getId() === service.getId());
    if (index === -1) {
      throw new Error(`Service with id "${service.getId()}" not found`);
    }
    services[index] = service;
    await this.persistServices(services);
  }

  async delete(id: string): Promise<void> {
    const services = await this.findAll();
    const filtered = services.filter(s => s.getId() !== id);
    if (filtered.length === services.length) {
      throw new Error(`Service with id "${id}" not found`);
    }
    await this.persistServices(filtered);
  }

  async findById(id: string): Promise<CloudService | null> {
    const services = await this.findAll();
    return services.find(s => s.getId() === id) ?? null;
  }

  async findAll(): Promise<CloudService[]> {
    const data = await this.storage.load<CloudServiceStorageModel[]>(StorageKeys.SERVICES);
    if (!data) {
      return [];
    }
    return data.map(CloudServiceMapper.fromStorage);
  }

  async enableMonitoring(id: string): Promise<void> {
    const service = await this.findById(id);
    if (!service) {
      throw new Error(`Service with id "${id}" not found`);
    }
    const updated = service.enableMonitoring();
    await this.update(updated);
  }

  async disableMonitoring(id: string): Promise<void> {
    const service = await this.findById(id);
    if (!service) {
      throw new Error(`Service with id "${id}" not found`);
    }
    const updated = service.disableMonitoring();
    await this.update(updated);
  }

  private async persistServices(services: CloudService[]): Promise<void> {
    const models = services.map(CloudServiceMapper.toStorage);
    await this.storage.save(StorageKeys.SERVICES, models);
  }
}
