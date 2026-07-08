import { AppSettings } from '../../features/settings/types';
import { SettingsRepository } from '../../infrastructure/repositories/SettingsRepository';

export class ImportSettingsUseCase {
  constructor(private readonly repository: SettingsRepository) {}

  async execute(jsonData: string): Promise<void> {
    try {
      const data = JSON.parse(jsonData);
      if (!data.settings) {
        throw new Error('Invalid import data format');
      }
      await this.repository.save(data.settings as AppSettings);
    } catch (error) {
      throw new Error(`Failed to import settings: ${error instanceof Error ? error.message : 'Unknown error'}`);
    }
  }
}
