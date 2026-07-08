/**
 * NotificationPolicy - Determines when notifications should be sent
 * Implements business rules for notification scheduling
 */
import { NotificationPreferences, QuietHours } from '../../features/notifications/types';

export interface NotificationContext {
  serviceId: string;
  serviceName: string;
  type: 'SERVICE_DOWN' | 'SERVICE_RECOVERED' | 'HIGH_RESPONSE_TIME' | 'LOW_HEALTH_SCORE';
  responseTimeMs?: number;
  healthScore?: number;
  previousStatus?: string;
  currentStatus?: string;
}

export class NotificationPolicy {
  /**
   * Check if a notification should be sent based on preferences and context
   */
  shouldSendNotification(
    context: NotificationContext,
    preferences: NotificationPreferences
  ): boolean {
    // Check if notifications are globally enabled
    if (!preferences.enabled) {
      return false;
    }

    // Check if we're in quiet hours
    if (this.isInQuietHours(preferences.quietHours)) {
      return false;
    }

    // Check per-service settings
    const serviceSettings = preferences.perServiceSettings[context.serviceId];
    if (!serviceSettings?.enabled) {
      return false;
    }

    // Check notification type permissions
    switch (context.type) {
      case 'SERVICE_DOWN':
        return serviceSettings.notifyOnDown;
      case 'SERVICE_RECOVERED':
        return serviceSettings.notifyOnRecovery;
      case 'HIGH_RESPONSE_TIME':
        if (!serviceSettings.notifyOnHighResponseTime) {
          return false;
        }
        // Check if response time exceeds threshold
        if (context.responseTimeMs !== undefined && serviceSettings.responseTimeThreshold !== undefined) {
          return context.responseTimeMs > serviceSettings.responseTimeThreshold;
        }
        return false;
      case 'LOW_HEALTH_SCORE':
        if (!serviceSettings.notifyOnLowHealthScore) {
          return false;
        }
        // Check if health score is below threshold
        if (context.healthScore !== undefined && serviceSettings.healthScoreThreshold !== undefined) {
          return context.healthScore < serviceSettings.healthScoreThreshold;
        }
        return false;
      default:
        return false;
    }
  }

  /**
   * Check if current time is within quiet hours
   */
  private isInQuietHours(quietHours: QuietHours): boolean {
    if (!quietHours.enabled) {
      return false;
    }

    const now = new Date();
    const currentTime = now.getHours() * 60 + now.getMinutes();

    const [startHour, startMinute] = quietHours.startTime.split(':').map(Number);
    const [endHour, endMinute] = quietHours.endTime.split(':').map(Number);

    const startTime = startHour * 60 + startMinute;
    const endTime = endHour * 60 + endMinute;

    // Handle quiet hours that span midnight (e.g., 22:00 to 07:00)
    if (startTime > endTime) {
      // Quiet hours span midnight
      return currentTime >= startTime || currentTime < endTime;
    } else {
      // Quiet hours within same day
      return currentTime >= startTime && currentTime < endTime;
    }
  }

  /**
   * Check if duplicate notification prevention should apply
   * Returns true if a notification was already sent for this state
   */
  shouldPreventDuplicate(
    lastNotificationType: string | null,
    currentType: string
  ): boolean {
    // Prevent duplicate DOWN notifications
    if (currentType === 'SERVICE_DOWN' && lastNotificationType === 'SERVICE_DOWN') {
      return true;
    }

    // Prevent duplicate RECOVERY notifications
    if (currentType === 'SERVICE_RECOVERED' && lastNotificationType === 'SERVICE_RECOVERED') {
      return true;
    }

    return false;
  }
}
