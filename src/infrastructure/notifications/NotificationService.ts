import { NotificationPermissionManager } from './NotificationPermissionManager';
import { ExpoNotificationAdapter, NotificationPayload } from './ExpoNotificationAdapter';

/**
 * NotificationService - High-level service for sending notifications
 * Combines permission management and notification sending capabilities
 */
export interface NotificationSendResult {
  success: boolean;
  notificationId?: string;
  error?: string;
}

export class NotificationService {
  private readonly permissionManager: NotificationPermissionManager;
  private readonly adapter: ExpoNotificationAdapter;
  private isInitialized = false;

  constructor(
    permissionManager?: NotificationPermissionManager,
    adapter?: ExpoNotificationAdapter
  ) {
    this.permissionManager = permissionManager ?? new NotificationPermissionManager();
    this.adapter = adapter ?? new ExpoNotificationAdapter();
  }

  /**
   * Initialize the notification service
   */
  async initialize(): Promise<void> {
    if (this.isInitialized) {
      return;
    }

    // Set up foreground handler
    ExpoNotificationAdapter.configureForegroundHandler();

    // Set up Android channels
    await ExpoNotificationAdapter.setupAndroidChannel();

    this.isInitialized = true;
  }

  /**
   * Request notification permissions
   */
  async requestPermission(): Promise<boolean> {
    return this.permissionManager.requestPermission();
  }

  /**
   * Check if notifications are enabled
   */
  async isEnabled(): Promise<boolean> {
    return this.permissionManager.isEnabled();
  }

  /**
   * Send a monitoring alert notification (service down, high response time, etc.)
   */
  async sendAlert(payload: Omit<NotificationPayload, 'sound' | 'vibration'> & { sound?: boolean; vibration?: boolean }): Promise<NotificationSendResult> {
    try {
      const hasPermission = await this.isEnabled();
      if (!hasPermission) {
        return { success: false, error: 'Notification permission not granted' };
      }

      const notificationId = await this.adapter.sendNotification({
        ...payload,
        sound: payload.sound ?? true,
        vibration: payload.vibration ?? true,
      });

      if (notificationId) {
        return { success: true, notificationId };
      }

      return { success: false, error: 'Failed to send notification' };
    } catch (error) {
      return { 
        success: false, 
        error: error instanceof Error ? error.message : 'Unknown error' 
      };
    }
  }

  /**
   * Send a recovery notification (service back up)
   */
  async sendRecovery(payload: Omit<NotificationPayload, 'sound' | 'vibration'> & { sound?: boolean; vibration?: boolean }): Promise<NotificationSendResult> {
    try {
      const hasPermission = await this.isEnabled();
      if (!hasPermission) {
        return { success: false, error: 'Notification permission not granted' };
      }

      const notificationId = await this.adapter.sendRecoveryNotification({
        ...payload,
        sound: payload.sound ?? true,
        vibration: payload.vibration ?? true,
      });

      if (notificationId) {
        return { success: true, notificationId };
      }

      return { success: false, error: 'Failed to send recovery notification' };
    } catch (error) {
      return { 
        success: false, 
        error: error instanceof Error ? error.message : 'Unknown error' 
      };
    }
  }

  /**
   * Cancel a specific notification
   */
  async cancelNotification(notificationId: string): Promise<void> {
    await this.adapter.cancelNotification(notificationId);
  }

  /**
   * Cancel all pending notifications
   */
  async cancelAllNotifications(): Promise<void> {
    await this.adapter.cancelAllNotifications();
  }

  /**
   * Open system notification settings
   */
  async openSettings(): Promise<void> {
    await this.permissionManager.openSettings();
  }

  /**
   * Update badge count
   */
  async setBadgeCount(count: number): Promise<void> {
    await this.adapter.setBadgeCount(count);
  }

  /**
   * Get current badge count
   */
  async getBadgeCount(): Promise<number> {
    return this.adapter.getBadgeCount();
  }
}
