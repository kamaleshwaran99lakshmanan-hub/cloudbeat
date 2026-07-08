/**
 * Notification types for the notification system
 */

export type NotificationType = 
  | 'SERVICE_DOWN'
  | 'SERVICE_RECOVERED'
  | 'HIGH_RESPONSE_TIME'
  | 'LOW_HEALTH_SCORE';

export interface NotificationData {
  id: string;
  type: NotificationType;
  serviceId: string;
  serviceName: string;
  title: string;
  message: string;
  timestamp: Date;
  isRead: boolean;
  metadata?: Record<string, unknown>;
}

export interface NotificationPreferences {
  enabled: boolean;
  soundEnabled: boolean;
  vibrationEnabled: boolean;
  quietHours: QuietHours;
  perServiceSettings: Record<string, ServiceNotificationSettings>;
}

export interface QuietHours {
  enabled: boolean;
  startTime: string; // HH:mm format
  endTime: string; // HH:mm format
}

export interface ServiceNotificationSettings {
  enabled: boolean;
  notifyOnDown: boolean;
  notifyOnRecovery: boolean;
  notifyOnHighResponseTime: boolean;
  notifyOnLowHealthScore: boolean;
  responseTimeThreshold?: number; // in ms
  healthScoreThreshold?: number; // 0-100
}

export const defaultQuietHours: QuietHours = {
  enabled: false,
  startTime: '22:00',
  endTime: '07:00',
};

export const defaultServiceNotificationSettings: ServiceNotificationSettings = {
  enabled: true,
  notifyOnDown: true,
  notifyOnRecovery: true,
  notifyOnHighResponseTime: true,
  notifyOnLowHealthScore: true,
  responseTimeThreshold: 5000,
  healthScoreThreshold: 70,
};

export const defaultNotificationPreferences: NotificationPreferences = {
  enabled: true,
  soundEnabled: true,
  vibrationEnabled: true,
  quietHours: defaultQuietHours,
  perServiceSettings: {},
};
