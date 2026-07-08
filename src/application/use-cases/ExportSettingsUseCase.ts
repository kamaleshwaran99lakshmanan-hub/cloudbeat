import { AppSettings } from '../../features/settings/types';
import { SettingsRepository } from '../../infrastructure/repositories/SettingsRepository';

export class ExportSettingsUseCase {
  constructor(private readonly repository: SettingsRepository) {}

  async execute(): Promise<string> {
    const settings = await this.repository.getOrDefault();
    const exportData = {
      settings,
      exportedAt: new Date().toISOString(),
      version: '1.0.0',
    };
    return JSON.stringify(exportData, null, 2);
  }
}
