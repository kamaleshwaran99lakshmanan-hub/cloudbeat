import { AppSettings } from '../../features/settings/types';
import { SettingsRepository } from '../../infrastructure/repositories/SettingsRepository';

export class SaveAppSettingsUseCase {
  constructor(private readonly repository: SettingsRepository) {}

  async execute(settings: AppSettings): Promise<void> {
    await this.repository.save(settings);
  }
}
