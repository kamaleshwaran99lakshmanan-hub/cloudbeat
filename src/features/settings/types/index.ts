export interface AppSettings {
  theme: 'system' | 'light' | 'dark';
  monitoring: {
    defaultInterval: number; // in seconds
    defaultRetryCount: number;
    defaultTimeout: number; // in milliseconds
    autoStartMonitoring: boolean;
  };
  notifications: {
    enabled: boolean;
    soundEnabled: boolean;
    vibrationEnabled: boolean;
    quietHours: {
      enabled: boolean;
      startTime: string;
      endTime: string;
    };
  };
  dataManagement: {
    lastExportDate?: string;
    lastImportDate?: string;
  };
}

export interface SettingsSectionProps {
  title: string;
  children: React.ReactNode;
}

export interface SettingsItemProps {
  icon: string;
  label: string;
  value?: string | boolean;
  onPress?: () => void;
  rightElement?: React.ReactNode;
  isLast?: boolean;
}

export interface ThemeOption {
  value: 'system' | 'light' | 'dark';
  label: string;
  icon: string;
}

export interface ExportData {
  settings: AppSettings;
  exportedAt: string;
  version: string;
}
