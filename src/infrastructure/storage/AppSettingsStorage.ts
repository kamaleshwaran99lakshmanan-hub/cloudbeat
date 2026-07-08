import AsyncStorage from '@react-native-async-storage/async-storage';
import { AppSettings } from '../../features/settings/types';

const SETTINGS_KEY = 'app_settings_storage';

export class AppSettingsStorage {
  async load(): Promise<AppSettings | null> {
    try {
      const stored = await AsyncStorage.getItem(SETTINGS_KEY);
      if (stored) {
        return JSON.parse(stored);
      }
      return null;
    } catch (error) {
      console.error('Error loading settings:', error);
      return null;
    }
  }

  async save(settings: AppSettings): Promise<void> {
    try {
      await AsyncStorage.setItem(SETTINGS_KEY, JSON.stringify(settings));
    } catch (error) {
      console.error('Error saving settings:', error);
      throw error;
    }
  }

  async clear(): Promise<void> {
    try {
      await AsyncStorage.removeItem(SETTINGS_KEY);
    } catch (error) {
      console.error('Error clearing settings:', error);
      throw error;
    }
  }

  async getTheme(): Promise<'system' | 'light' | 'dark'> {
    const settings = await this.load();
    return settings?.theme ?? 'system';
  }

  async setTheme(theme: 'system' | 'light' | 'dark'): Promise<void> {
    const current = await this.load();
    const settings: AppSettings = current ?? this.getDefaultSettings();
    await this.save({ ...settings, theme });
  }

  private getDefaultSettings(): AppSettings {
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
}
