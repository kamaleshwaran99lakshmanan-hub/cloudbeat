import { useState, useEffect, useCallback } from 'react';
import { AppSettings } from '../types';
import { GetAppSettingsUseCase } from '../../../application/use-cases/GetAppSettingsUseCase';
import { SaveAppSettingsUseCase } from '../../../application/use-cases/SaveAppSettingsUseCase';

export const useThemeSettings = () => {
  const [theme, setTheme] = useState<'system' | 'light' | 'dark'>('system');
  const [loading, setLoading] = useState<boolean>(true);

  const getAppSettingsUseCase = new GetAppSettingsUseCase(
    require('../../../infrastructure/repositories/SettingsRepository').default
  );
  const saveSettingsUseCase = new SaveAppSettingsUseCase(
    require('../../../infrastructure/repositories/SettingsRepository').default
  );

  const loadTheme = useCallback(async () => {
    try {
      setLoading(true);
      const settings = await getAppSettingsUseCase.execute();
      setTheme(settings.theme);
    } catch (err) {
      console.error('Failed to load theme:', err);
    } finally {
      setLoading(false);
    }
  }, []);

  useEffect(() => {
    loadTheme();
  }, [loadTheme]);

  const updateTheme = async (newTheme: 'system' | 'light' | 'dark') => {
    try {
      const settings = await getAppSettingsUseCase.execute();
      await saveSettingsUseCase.execute({
        ...settings,
        theme: newTheme,
      });
      setTheme(newTheme);
    } catch (err) {
      console.error('Failed to update theme:', err);
    }
  };

  return {
    theme,
    loading,
    updateTheme,
  };
};
