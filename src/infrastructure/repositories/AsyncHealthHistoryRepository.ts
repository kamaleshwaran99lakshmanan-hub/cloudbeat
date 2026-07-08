import { HealthHistoryRepository } from '../../../application/repositories/HealthHistoryRepository';
import { HealthCheck } from '../../../domain/entities/HealthCheck';
import { AsyncStorageClient, StorageKeys } from '../../storage';
import { HealthCheckMapper, HealthCheckStorageModel } from '../../mappers';

export class AsyncHealthHistoryRepository implements HealthHistoryRepository {
  private readonly storage: AsyncStorageClient;

  constructor(storage?: AsyncStorageClient) {
    this.storage = storage ?? new AsyncStorageClient();
  }

  async save(record: HealthCheck): Promise<void> {
    const records = await this.findByService(record.getServiceId());
    records.push(record);
    await this.persistAllRecords(records);
  }

  async saveMany(records: HealthCheck[]): Promise<void> {
    if (records.length === 0) {
      return;
    }
    const serviceId = records[0].getServiceId();
    const existing = await this.findByService(serviceId);
    const merged = [...existing, ...records];
    await this.persistAllRecords(merged);
  }

  async findByService(serviceId: string): Promise<HealthCheck[]> {
    const allData = await this.storage.load<HealthCheckStorageModel[]>(StorageKeys.HISTORY);
    if (!allData) {
      return [];
    }
    return allData
      .filter(model => model.serviceId === serviceId)
      .map(HealthCheckMapper.fromStorage);
  }

  async findLatest(serviceId: string): Promise<HealthCheck | null> {
    const records = await this.findByService(serviceId);
    if (records.length === 0) {
      return null;
    }
    return records.reduce((latest, current) => 
      current.getCheckedAt() > latest.getCheckedAt() ? current : latest
    );
  }

  async findBetween(serviceId: string, from: Date, to: Date): Promise<HealthCheck[]> {
    const records = await this.findByService(serviceId);
    return records.filter(record => {
      const checkedAt = record.getCheckedAt();
      return checkedAt >= from && checkedAt <= to;
    });
  }

  async deleteOlderThan(date: Date): Promise<void> {
    const allData = await this.storage.load<HealthCheckStorageModel[]>(StorageKeys.HISTORY);
    if (!allData) {
      return;
    }
    const filtered = allData.filter(model => {
      const checkedAt = new Date(model.checkedAt);
      return checkedAt > date;
    });
    await this.storage.save(StorageKeys.HISTORY, filtered);
  }

  private async persistAllRecords(records: HealthCheck[]): Promise<void> {
    const models = records.map(HealthCheckMapper.toStorage);
    const allData = await this.storage.load<HealthCheckStorageModel[]>(StorageKeys.HISTORY);
    const otherServices = (allData ?? []).filter(m => 
      !records.some(r => r.getId() === m.id)
    );
    const merged = [...otherServices, ...models];
    await this.storage.save(StorageKeys.HISTORY, merged);
  }
}
