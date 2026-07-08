import { NotificationRule } from '../../domain/entities/NotificationRule';
import { NotificationRepository } from '../repositories/NotificationRepository';

export class GetUnreadNotifications {
  constructor(private readonly notificationRepository: NotificationRepository) {}

  async execute(): Promise<NotificationRule[]> {
    return this.notificationRepository.findRules();
  }
}
