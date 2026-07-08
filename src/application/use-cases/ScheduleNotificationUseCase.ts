import { NotificationContext } from '../notifications/NotificationPolicy';
import { NotificationManager } from '../notifications/NotificationManager';

/**
 * ScheduleMonitoringNotificationUseCase - Use case for scheduling notifications based on monitoring results
 */
export class ScheduleMonitoringNotificationUseCase {
  constructor(private readonly notificationManager: NotificationManager) {}

  async execute(context: NotificationContext): Promise<{ sent: boolean; reason?: string }> {
    return this.notificationManager.processMonitoringResult(context);
  }
}
