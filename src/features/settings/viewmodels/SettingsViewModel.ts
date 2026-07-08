import { AppSettings } from '../types';
import { GetAppSettingsUseCase } from '../../../application/use-cases/GetAppSettingsUseCase';
import { SaveAppSettingsUseCase } from '../../../application/use-cases/SaveAppSettingsUseCase';
import { ResetSettingsUseCase } from '../../../application/use-cases/ResetSettingsUseCase';

export class SettingsViewModel {
  private getSettingsUseCase: GetAppSettingsUseCase;
  private saveSettingsUseCase: SaveAppSettingsUseCase;
  private resetSettingsUseCase: ResetSettingsUseCase;

  constructor(
    getSettingsUseCase: GetAppSettingsUseCase,
    saveSettingsUseCase: SaveAppSettingsUseCase,
    resetSettingsUseCase: ResetSettingsUseCase
  ) {
    this.getSettingsUseCase = getSettingsUseCase;
    this.saveSettingsUseCase = saveSettingsUseCase;
    this.resetSettingsUseCase = resetSettingsUseCase;
  }

  async loadSettings(): Promise<AppSettings> {
    return this.getSettingsUseCase.execute();
  }

  async updateTheme(theme: 'system' | 'light' | 'dark'): Promise<void> {
    const settings = await this.getSettingsUseCase.execute();
    await this.saveSettingsUseCase.execute({ ...settings, theme });
  }

  async updateMonitoringInterval(interval: number): Promise<void> {
    const settings = await this.getSettingsUseCase.execute();
    await this.saveSettingsUseCase.execute({
      ...settings,
      monitoring: { ...settings.monitoring, defaultInterval: interval },
    });
  }

  async updateAutoStartMonitoring(autoStart: boolean): Promise<void> {
    const settings = await this.getSettingsUseCase.execute();
    await this.saveSettingsUseCase.execute({
      ...settings,
      monitoring: { ...settings.monitoring, autoStartMonitoring: autoStart },
    });
  }

  async updateNotificationEnabled(enabled: boolean): Promise<void> {
    const settings = await this.getSettingsUseCase.execute();
    await this.saveSettingsUseCase.execute({
      ...settings,
      notifications: { ...settings.notifications, enabled },
    });
  }

  async resetAllSettings(): Promise<void> {
    await this.resetSettingsUseCase.execute();
  }
}
