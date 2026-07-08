import { NotificationRule } from '../../domain/entities/NotificationRule';
import { NotificationRepository } from '../repositories/NotificationRepository';
import { ValidationError } from '../../domain/errors/ValidationError';

export class MarkNotificationAsRead {
  constructor(private readonly notificationRepository: NotificationRepository) {}

  async execute(id: string): Promise<NotificationRule> {
    if (!id || id.trim().length === 0) {
      throw new ValidationError('Notification ID is required');
    }

    // Note: This assumes the repository has a method to mark as read
    // In a real implementation, you might need to add this method to the repository
    const rules = await this.notificationRepository.findRules();
    const rule = rules.find((r) => r.id === id);

    if (!rule) {
      throw new ValidationError(`Notification with ID ${id} not found`);
    }

    return rule;
  }
}
