import { AppearanceStyle } from '@rneui/themed';
import { SettingsRepository } from './repositories/SettingsRepository';

export class ThemeManager {
  private settingsRepo: SettingsRepository;

  constructor(settingsRepo: SettingsRepository) {
    this.settingsRepo = settingsRepo;
  }

  async getCurrentTheme(): Promise<'system' | 'light' | 'dark'> {
    const settings = await this.settingsRepo.getOrDefault();
    return settings.theme;
  }

  async setTheme(theme: 'system' | 'light' | 'dark'): Promise<void> {
    await this.settingsRepo.setTheme(theme);
  }

  getAppearanceStyle(theme: 'system' | 'light' | 'dark'): Partial<AppearanceStyle> {
    if (theme === 'dark') {
      return {
        darkMode: true,
        colors: {
          primary: '#007AFF',
          background: '#000000',
          white: '#1C1C1E',
          grey1: '#3A3A3C',
          grey2: '#48484A',
          grey3: '#636366',
          grey4: '#8E8E93',
          grey5: '#AEAEB2',
          greyOutline: '#38383A',
          searchBg: '#3A3A3C',
          success: '#34C759',
          error: '#FF3B30',
          warning: '#FF9500',
          disabled: '#636366',
        },
      };
    }

    if (theme === 'light') {
      return {
        darkMode: false,
        colors: {
          primary: '#007AFF',
          background: '#F2F2F7',
          white: '#FFFFFF',
          grey1: '#3A3A3C',
          grey2: '#8E8E93',
          grey3: '#C7C7CC',
          grey4: '#E5E5EA',
          grey5: '#F2F2F7',
          greyOutline: '#D1D1D6',
          searchBg: '#E5E5EA',
          success: '#34C759',
          error: '#FF3B30',
          warning: '#FF9500',
          disabled: '#C7C7CC',
        },
      };
    }

    // System default - will be handled by React Native's useColorScheme
    return {};
  }
}
