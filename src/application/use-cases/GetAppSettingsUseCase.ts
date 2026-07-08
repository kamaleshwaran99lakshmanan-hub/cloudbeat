import { AppSettings } from '../../features/settings/types';
import { SettingsRepository } from '../../infrastructure/repositories/SettingsRepository';

export class GetAppSettingsUseCase {
  constructor(private readonly repository: SettingsRepository) {}

  async execute(): Promise<AppSettings> {
    return this.repository.getOrDefault();
  }
}
