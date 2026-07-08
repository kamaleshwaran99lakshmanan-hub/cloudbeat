import { NotificationPolicy, NotificationContext } from './NotificationPolicy';
import { NotificationPreferencesRepository } from '../../infrastructure/repositories/NotificationPreferencesRepository';
import { NotificationService } from '../../infrastructure/notifications/NotificationService';

/**
 * NotificationManager - Coordinates notification sending logic
 * Orchestrates policy checking and notification delivery
 */
export interface LastNotificationState {
  serviceId: string;
  type: string | null;
  timestamp: Date;
}

export class NotificationManager {
  private readonly policy: NotificationPolicy;
  private readonly preferencesRepository: NotificationPreferencesRepository;
  private readonly notificationService: NotificationService;
  private readonly lastNotifications: Map<string, LastNotificationState>;

  constructor(
    policy?: NotificationPolicy,
    preferencesRepository?: NotificationPreferencesRepository,
    notificationService?: NotificationService
  ) {
    this.policy = policy ?? new NotificationPolicy();
    this.preferencesRepository = preferencesRepository ?? new NotificationPreferencesRepository();
    this.notificationService = notificationService ?? new NotificationService();
    this.lastNotifications = new Map();
  }

  /**
   * Initialize the notification manager
   */
  async initialize(): Promise<void> {
    await this.notificationService.initialize();
  }

  /**
   * Process a monitoring result and send notifications if needed
   */
  async processMonitoringResult(context: NotificationContext): Promise<{ sent: boolean; reason?: string }> {
    try {
      // Get current preferences
      const preferences = await this.preferencesRepository.getOrDefault();

      // Check if notification should be sent based on policy
      if (!this.policy.shouldSendNotification(context, preferences)) {
        return { sent: false, reason: 'Policy denied notification' };
      }

      // Check for duplicate prevention
      const lastState = this.lastNotifications.get(context.serviceId);
      if (this.policy.shouldPreventDuplicate(lastState?.type ?? null, context.type)) {
        return { sent: false, reason: 'Duplicate notification prevented' };
      }

      // Build notification payload
      const payload = this.buildNotificationPayload(context);

      // Send notification based on type
      let result;
      if (context.type === 'SERVICE_RECOVERED') {
        result = await this.notificationService.sendRecovery(payload);
      } else {
        result = await this.notificationService.sendAlert(payload);
      }

      if (result.success) {
        // Update last notification state
        this.lastNotifications.set(context.serviceId, {
          serviceId: context.serviceId,
          type: context.type,
          timestamp: new Date(),
        });

        return { sent: true };
      }

      return { sent: false, reason: result.error };
    } catch (error) {
      console.error('Failed to process monitoring result:', error);
      return { 
        sent: false, 
        reason: error instanceof Error ? error.message : 'Unknown error' 
      };
    }
  }

  /**
   * Build notification payload from context
   */
  private buildNotificationPayload(context: NotificationContext): {
    title: string;
    message: string;
    data: Record<string, unknown>;
  } {
    let title: string;
    let message: string;

    switch (context.type) {
      case 'SERVICE_DOWN':
        title = 'Service Down';
        message = `${context.serviceName} is not responding`;
        break;
      case 'SERVICE_RECOVERED':
        title = 'Service Recovered';
        message = `${context.serviceName} is back online`;
        break;
      case 'HIGH_RESPONSE_TIME':
        title = 'High Response Time';
        message = `${context.serviceName} response time: ${context.responseTimeMs}ms`;
        break;
      case 'LOW_HEALTH_SCORE':
        title = 'Low Health Score';
        message = `${context.serviceName} health score: ${context.healthScore}`;
        break;
      default:
        title = 'Monitoring Alert';
        message = `Alert for ${context.serviceName}`;
    }

    return {
      title,
      message,
      data: {
        serviceId: context.serviceId,
        serviceName: context.serviceName,
        type: context.type,
        timestamp: new Date().toISOString(),
      },
    };
  }

  /**
   * Reset the last notification state for a service (e.g., after recovery)
   */
  resetServiceState(serviceId: string): void {
    this.lastNotifications.delete(serviceId);
  }

  /**
   * Get the last notification state for a service
   */
  getLastNotificationState(serviceId: string): LastNotificationState | undefined {
    return this.lastNotifications.get(serviceId);
  }
}
