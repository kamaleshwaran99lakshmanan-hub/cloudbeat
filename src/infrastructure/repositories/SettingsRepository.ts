import AsyncStorage from '@react-native-async-storage/async-storage';
import { AppSettings } from '../../features/settings/types';

const SETTINGS_KEY = 'app_settings';

export class SettingsRepository {
  async get(): Promise<AppSettings | null> {
    try {
      const stored = await AsyncStorage.getItem(SETTINGS_KEY);
      if (stored) {
        return JSON.parse(stored);
      }
      return null;
    } catch (error) {
      console.error('Error getting settings:', error);
      return null;
    }
  }

  async getOrDefault(): Promise<AppSettings> {
    const stored = await this.get();
    if (stored) {
      return stored;
    }

    // Return default settings
    return {
      theme: 'system',
      monitoring: {
        defaultInterval: 30,
        defaultRetryCount: 3,
        defaultTimeout: 5000,
        autoStartMonitoring: false,
      },
      notifications: {
        enabled: true,
        soundEnabled: true,
        vibrationEnabled: true,
        quietHours: {
          enabled: false,
          startTime: '22:00',
          endTime: '07:00',
        },
      },
      dataManagement: {},
    };
  }

  async save(settings: AppSettings): Promise<void> {
    try {
      await AsyncStorage.setItem(SETTINGS_KEY, JSON.stringify(settings));
    } catch (error) {
      console.error('Error saving settings:', error);
      throw error;
    }
  }

  async reset(): Promise<void> {
    try {
      await AsyncStorage.removeItem(SETTINGS_KEY);
    } catch (error) {
      console.error('Error resetting settings:', error);
      throw error;
    }
  }

  async setTheme(theme: 'system' | 'light' | 'dark'): Promise<void> {
    const current = await this.getOrDefault();
    await this.save({ ...current, theme });
  }

  async setMonitoringInterval(interval: number): Promise<void> {
    const current = await this.getOrDefault();
    await this.save({
      ...current,
      monitoring: { ...current.monitoring, defaultInterval: interval },
    });
  }

  async setAutoStartMonitoring(autoStart: boolean): Promise<void> {
    const current = await this.getOrDefault();
    await this.save({
      ...current,
      monitoring: { ...current.monitoring, autoStartMonitoring: autoStart },
    });
  }
}

// Export singleton instance for convenience
export default new SettingsRepository();
