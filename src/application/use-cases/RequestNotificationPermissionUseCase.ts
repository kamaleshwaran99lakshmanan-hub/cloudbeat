import { NotificationPermissionManager } from '../../infrastructure/notifications/NotificationPermissionManager';

/**
 * RequestNotificationPermissionUseCase - Use case for requesting notification permissions
 */
export class RequestNotificationPermissionUseCase {
  constructor(private readonly permissionManager: NotificationPermissionManager) {}

  async execute(): Promise<boolean> {
    return this.permissionManager.requestPermission();
  }

  async getStatus(): Promise<'granted' | 'denied' | 'undetermined'> {
    return this.permissionManager.getPermissionStatus();
  }

  async isEnabled(): Promise<boolean> {
    return this.permissionManager.isEnabled();
  }
}
