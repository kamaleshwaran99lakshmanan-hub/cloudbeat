import { SettingsRepository } from '../../infrastructure/repositories/SettingsRepository';

export class ResetSettingsUseCase {
  constructor(private readonly repository: SettingsRepository) {}

  async execute(): Promise<void> {
    await this.repository.reset();
  }
}
