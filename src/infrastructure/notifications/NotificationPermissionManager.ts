import * as Notifications from 'expo-notifications';
import { Platform } from 'react-native';

/**
 * NotificationPermissionManager - Handles notification permission requests and status
 * Infrastructure layer implementation for Expo Notifications
 */
export class NotificationPermissionManager {
  /**
   * Request notification permissions from the user
   */
  async requestPermission(): Promise<boolean> {
    try {
      const { status: existingStatus } = await Notifications.getPermissionsAsync();
      
      if (existingStatus === 'granted') {
        return true;
      }

      const { status } = await Notifications.requestPermissionsAsync({
        ios: {
          allowAlert: true,
          allowBadge: true,
          allowSound: true,
          allowDisplayInCarPlay: true,
          allowCriticalAlerts: true,
          allowAnnouncements: false,
        },
        android: {
          allowAlert: true,
          allowBadge: true,
          allowSound: true,
          allowDisplayInCarPlay: true,
          allowCriticalAlerts: true,
          allowVibrate: true,
        },
      });

      return status === 'granted';
    } catch (error) {
      console.error('Failed to request notification permissions:', error);
      return false;
    }
  }

  /**
   * Get current notification permission status
   */
  async getPermissionStatus(): Promise<'granted' | 'denied' | 'undetermined'> {
    try {
      const { status } = await Notifications.getPermissionsAsync();
      return status;
    } catch (error) {
      console.error('Failed to get notification permissions:', error);
      return 'undetermined';
    }
  }

  /**
   * Check if notifications are enabled
   */
  async isEnabled(): Promise<boolean> {
    const status = await this.getPermissionStatus();
    return status === 'granted';
  }

  /**
   * Open app settings for notifications
   */
  async openSettings(): Promise<void> {
    try {
      await Notifications.openSettingsAsync();
    } catch (error) {
      console.error('Failed to open notification settings:', error);
    }
  }
}
