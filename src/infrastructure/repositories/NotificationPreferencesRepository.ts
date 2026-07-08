import { NotificationPreferences } from '../../../features/notifications/types';
import { AsyncStorageClient, StorageKeys } from '../storage';

/**
 * NotificationPreferencesRepository - Persists notification preferences
 * Infrastructure implementation using AsyncStorage
 */
export class NotificationPreferencesRepository {
  private readonly storage: AsyncStorageClient;

  constructor(storage?: AsyncStorageClient) {
    this.storage = storage ?? new AsyncStorageClient();
  }

  /**
   * Save notification preferences
   */
  async save(preferences: NotificationPreferences): Promise<void> {
    try {
      await this.storage.save(StorageKeys.NOTIFICATION_PREFERENCES, preferences);
    } catch (error) {
      console.error('Failed to save notification preferences:', error);
      throw new Error('Failed to save notification preferences');
    }
  }

  /**
   * Get notification preferences
   */
  async get(): Promise<NotificationPreferences | null> {
    try {
      return await this.storage.load<NotificationPreferences>(StorageKeys.NOTIFICATION_PREFERENCES);
    } catch (error) {
      console.error('Failed to load notification preferences:', error);
      return null;
    }
  }

  /**
   * Get or create default preferences
   */
  async getOrDefault(): Promise<NotificationPreferences> {
    const preferences = await this.get();
    if (preferences) {
      return preferences;
    }

    // Return default preferences
    const defaults: NotificationPreferences = {
      enabled: true,
      soundEnabled: true,
      vibrationEnabled: true,
      quietHours: {
        enabled: false,
        startTime: '22:00',
        endTime: '07:00',
      },
      perServiceSettings: {},
    };

    await this.save(defaults);
    return defaults;
  }

  /**
   * Update global enabled state
   */
  async setEnabled(enabled: boolean): Promise<void> {
    const preferences = await this.getOrDefault();
    await this.save({ ...preferences, enabled });
  }

  /**
   * Update sound enabled state
   */
  async setSoundEnabled(enabled: boolean): Promise<void> {
    const preferences = await this.getOrDefault();
    await this.save({ ...preferences, soundEnabled: enabled });
  }

  /**
   * Update vibration enabled state
   */
  async setVibrationEnabled(enabled: boolean): Promise<void> {
    const preferences = await this.getOrDefault();
    await this.save({ ...preferences, vibrationEnabled: enabled });
  }

  /**
   * Update quiet hours
   */
  async setQuietHours(quietHours: NotificationPreferences['quietHours']): Promise<void> {
    const preferences = await this.getOrDefault();
    await this.save({ ...preferences, quietHours });
  }

  /**
   * Get settings for a specific service
   */
  getServiceSettings(serviceId: string): NotificationPreferences['perServiceSettings'][string] {
    const defaults = {
      enabled: true,
      notifyOnDown: true,
      notifyOnRecovery: true,
      notifyOnHighResponseTime: true,
      notifyOnLowHealthScore: true,
      responseTimeThreshold: 5000,
      healthScoreThreshold: 70,
    };

    const preferences = this.getOrDefault();
    return preferences.then(p => p.perServiceSettings[serviceId] ?? defaults);
  }

  /**
   * Update settings for a specific service
   */
  async setServiceSettings(
    serviceId: string,
    settings: NotificationPreferences['perServiceSettings'][string]
  ): Promise<void> {
    const preferences = await this.getOrDefault();
    await this.save({
      ...preferences,
      perServiceSettings: {
        ...preferences.perServiceSettings,
        [serviceId]: settings,
      },
    });
  }

  /**
   * Delete settings for a specific service
   */
  async deleteServiceSettings(serviceId: string): Promise<void> {
    const preferences = await this.getOrDefault();
    const { [serviceId]: _, ...remaining } = preferences.perServiceSettings;
    await this.save({ ...preferences, perServiceSettings: remaining });
  }
}
