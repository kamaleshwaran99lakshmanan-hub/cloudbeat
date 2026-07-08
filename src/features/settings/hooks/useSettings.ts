import { useState, useEffect, useCallback } from 'react';
import { AppSettings } from '../types';
import { GetAppSettingsUseCase } from '../../../application/use-cases/GetAppSettingsUseCase';
import { SaveAppSettingsUseCase } from '../../../application/use-cases/SaveAppSettingsUseCase';
import { ResetSettingsUseCase } from '../../../application/use-cases/ResetSettingsUseCase';

export const useSettings = () => {
  const [settings, setSettings] = useState<AppSettings | null>(null);
  const [loading, setLoading] = useState<boolean>(true);
  const [error, setError] = useState<string | undefined>();

  const getAppSettingsUseCase = new GetAppSettingsUseCase(
    require('../../../infrastructure/repositories/SettingsRepository').default
  );
  const saveSettingsUseCase = new SaveAppSettingsUseCase(
    require('../../../infrastructure/repositories/SettingsRepository').default
  );
  const resetSettingsUseCase = new ResetSettingsUseCase(
    require('../../../infrastructure/repositories/SettingsRepository').default
  );

  const loadSettings = useCallback(async () => {
    try {
      setLoading(true);
      setError(undefined);
      const result = await getAppSettingsUseCase.execute();
      setSettings(result);
    } catch (err) {
      setError(err instanceof Error ? err.message : 'Failed to load settings');
    } finally {
      setLoading(false);
    }
  }, []);

  useEffect(() => {
    loadSettings();
  }, [loadSettings]);

  const updateTheme = async (theme: 'system' | 'light' | 'dark') => {
    if (!settings) return;
    try {
      await saveSettingsUseCase.execute({
        ...settings,
        theme,
      });
      setSettings({ ...settings, theme });
    } catch (err) {
      setError(err instanceof Error ? err.message : 'Failed to update theme');
    }
  };

  const updateMonitoringInterval = async (interval: number) => {
    if (!settings) return;
    try {
      await saveSettingsUseCase.execute({
        ...settings,
        monitoring: {
          ...settings.monitoring,
          defaultInterval: interval,
        },
      });
      setSettings({
        ...settings,
        monitoring: {
          ...settings.monitoring,
          defaultInterval: interval,
        },
      });
    } catch (err) {
      setError(err instanceof Error ? err.message : 'Failed to update interval');
    }
  };

  const updateAutoStartMonitoring = async (autoStart: boolean) => {
    if (!settings) return;
    try {
      await saveSettingsUseCase.execute({
        ...settings,
        monitoring: {
          ...settings.monitoring,
          autoStartMonitoring: autoStart,
        },
      });
      setSettings({
        ...settings,
        monitoring: {
          ...settings.monitoring,
          autoStartMonitoring: autoStart,
        },
      });
    } catch (err) {
      setError(err instanceof Error ? err.message : 'Failed to update auto-start');
    }
  };

  const updateNotificationEnabled = async (enabled: boolean) => {
    if (!settings) return;
    try {
      await saveSettingsUseCase.execute({
        ...settings,
        notifications: {
          ...settings.notifications,
          enabled,
        },
      });
      setSettings({
        ...settings,
        notifications: {
          ...settings.notifications,
          enabled,
        },
      });
    } catch (err) {
      setError(err instanceof Error ? err.message : 'Failed to update notification setting');
    }
  };

  const resetAllSettings = async () => {
    try {
      await resetSettingsUseCase.execute();
      await loadSettings();
    } catch (err) {
      setError(err instanceof Error ? err.message : 'Failed to reset settings');
    }
  };

  return {
    settings,
    loading,
    error,
    refetch: loadSettings,
    updateTheme,
    updateMonitoringInterval,
    updateAutoStartMonitoring,
    updateNotificationEnabled,
    resetAllSettings,
  };
};
