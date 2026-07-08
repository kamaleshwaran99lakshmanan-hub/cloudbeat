import { SettingsRepository } from '../../../application/repositories/SettingsRepository';
import { AsyncStorageClient, StorageKeys } from '../../storage';

export interface AppSettingsStorageModel {
  checkIntervalMs: number;
  theme: 'light' | 'dark' | 'system';
  notificationsEnabled: boolean;
}

export class AsyncSettingsRepository implements SettingsRepository {
  private readonly storage: AsyncStorageClient;

  constructor(storage?: AsyncStorageClient) {
    this.storage = storage ?? new AsyncStorageClient();
  }

  async saveSettings(settings: AppSettingsStorageModel): Promise<void> {
    await this.storage.save(StorageKeys.SETTINGS, settings);
  }

  async loadSettings(): Promise<AppSettingsStorageModel | null> {
    return await this.storage.load<AppSettingsStorageModel>(StorageKeys.SETTINGS);
  }
}
