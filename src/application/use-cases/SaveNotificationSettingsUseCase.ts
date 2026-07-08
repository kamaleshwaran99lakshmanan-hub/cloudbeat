import { NotificationPreferences } from '../../features/notifications/types';
import { NotificationPreferencesRepository } from '../../infrastructure/repositories/NotificationPreferencesRepository';

/**
 * SaveNotificationSettingsUseCase - Use case for saving notification settings
 */
export class SaveNotificationSettingsUseCase {
  constructor(private readonly repository: NotificationPreferencesRepository) {}

  async execute(preferences: NotificationPreferences): Promise<void> {
    await this.repository.save(preferences);
  }

  async get(): Promise<NotificationPreferences | null> {
    return this.repository.get();
  }

  async getOrDefault(): Promise<NotificationPreferences> {
    return this.repository.getOrDefault();
  }

  async setEnabled(enabled: boolean): Promise<void> {
    await this.repository.setEnabled(enabled);
  }

  async setSoundEnabled(enabled: boolean): Promise<void> {
    await this.repository.setSoundEnabled(enabled);
  }

  async setVibrationEnabled(enabled: boolean): Promise<void> {
    await this.repository.setVibrationEnabled(enabled);
  }

  async setQuietHours(quietHours: NotificationPreferences['quietHours']): Promise<void> {
    await this.repository.setQuietHours(quietHours);
  }

  async setServiceSettings(
    serviceId: string,
    settings: NotificationPreferences['perServiceSettings'][string]
  ): Promise<void> {
    await this.repository.setServiceSettings(serviceId, settings);
  }
}
