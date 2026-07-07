export interface SettingsData {
  checkIntervalMs: number;
  defaultRetryCount: number;
  defaultTimeoutMs: number;
  theme?: 'light' | 'dark' | 'system';
  notificationsEnabled: boolean;
}

export interface SettingsRepository {
  saveSettings(settings: SettingsData): Promise<void>;
  loadSettings(): Promise<SettingsData | null>;
}
