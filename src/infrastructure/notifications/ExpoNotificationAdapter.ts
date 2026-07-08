import * as Notifications from 'expo-notifications';
import { Platform } from 'react-native';

/**
 * ExpoNotificationAdapter - Infrastructure adapter for Expo Notifications
 * Handles sending local notifications with sound and vibration support
 */
export interface NotificationPayload {
  title: string;
  message: string;
  data?: Record<string, unknown>;
  sound?: boolean;
  vibration?: boolean;
}

export class ExpoNotificationAdapter {
  /**
   * Configure notification handler for when app is in foreground
   */
  static configureForegroundHandler(): void {
    Notifications.setNotificationHandler({
      handleNotificationReceived: async (notification) => {
        // Handle notification received while app is in foreground
        console.log('Notification received:', notification);
      },
      handleNotificationInteraction: async (response) => {
        // Handle user interaction with notification
        console.log('Notification interaction:', response);
      },
    });
  }

  /**
   * Set up notification channel for Android
   */
  static async setupAndroidChannel(): Promise<void> {
    if (Platform.OS === 'android') {
      await Notifications.setNotificationChannelAsync('monitoring-alerts', {
        name: 'Monitoring Alerts',
        importance: Notifications.AndroidImportance.MAX,
        vibrationPattern: [0, 250, 250, 250],
        lightColor: '#FF0000',
        sound: 'default',
      });

      await Notifications.setNotificationChannelAsync('monitoring-recovery', {
        name: 'Service Recovery',
        importance: Notifications.AndroidImportance.HIGH,
        vibrationPattern: [0, 100, 100, 100],
        lightColor: '#00FF00',
        sound: 'default',
      });
    }
  }

  /**
   * Send a local notification
   */
  async sendNotification(payload: NotificationPayload): Promise<string | null> {
    try {
      const { title, message, data, sound = true, vibration = true } = payload;

      // Configure notification content
      const notificationContent: Notifications.NotificationContentInput = {
        title,
        body: message,
        data: data || {},
      };

      // Add sound configuration
      if (sound) {
        notificationContent.sound = 'default';
      }

      // Add category for Android channel
      if (Platform.OS === 'android') {
        notificationContent.channelId = 'monitoring-alerts';
      }

      // Schedule and send the notification
      const notificationId = await Notifications.scheduleNotificationAsync({
        content: notificationContent,
        trigger: null, // Send immediately
      });

      return notificationId;
    } catch (error) {
      console.error('Failed to send notification:', error);
      return null;
    }
  }

  /**
   * Send a recovery notification (uses different channel on Android)
   */
  async sendRecoveryNotification(payload: NotificationPayload): Promise<string | null> {
    try {
      const { title, message, data, sound = true, vibration = true } = payload;

      const notificationContent: Notifications.NotificationContentInput = {
        title,
        body: message,
        data: data || {},
      };

      if (sound) {
        notificationContent.sound = 'default';
      }

      if (Platform.OS === 'android') {
        notificationContent.channelId = 'monitoring-recovery';
      }

      const notificationId = await Notifications.scheduleNotificationAsync({
        content: notificationContent,
        trigger: null,
      });

      return notificationId;
    } catch (error) {
      console.error('Failed to send recovery notification:', error);
      return null;
    }
  }

  /**
   * Cancel a specific notification by ID
   */
  async cancelNotification(notificationId: string): Promise<void> {
    try {
      await Notifications.cancelScheduledNotificationAsync(notificationId);
    } catch (error) {
      console.error('Failed to cancel notification:', error);
    }
  }

  /**
   * Cancel all scheduled notifications
   */
  async cancelAllNotifications(): Promise<void> {
    try {
      await Notifications.cancelAllScheduledNotificationsAsync();
    } catch (error) {
      console.error('Failed to cancel all notifications:', error);
    }
  }

  /**
   * Get all pending notifications
   */
  async getPendingNotifications(): Promise<Notifications.NotificationRequest[]> {
    try {
      return await Notifications.getAllScheduledNotificationsAsync();
    } catch (error) {
      console.error('Failed to get pending notifications:', error);
      return [];
    }
  }

  /**
   * Get badge count
   */
  async getBadgeCount(): Promise<number> {
    try {
      return await Notifications.getBadgeCountAsync();
    } catch (error) {
      console.error('Failed to get badge count:', error);
      return 0;
    }
  }

  /**
   * Set badge count
   */
  async setBadgeCount(count: number): Promise<void> {
    try {
      await Notifications.setBadgeCountAsync(Math.max(0, count));
    } catch (error) {
      console.error('Failed to set badge count:', error);
    }
  }
}
