import { NotificationContext } from './NotificationPolicy';
import { NotificationManager } from './NotificationManager';

/**
 * SendNotificationUseCase - Use case for sending a notification
 */
export class SendNotificationUseCase {
  constructor(private readonly notificationManager: NotificationManager) {}

  async execute(context: NotificationContext): Promise<{ sent: boolean; reason?: string }> {
    return this.notificationManager.processMonitoringResult(context);
  }
}
