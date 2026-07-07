import { NotificationRule } from '../../domain/entities/NotificationRule';

export interface NotificationRepository {
  saveRule(rule: NotificationRule): Promise<NotificationRule>;
  deleteRule(id: string): Promise<void>;
  findRules(): Promise<NotificationRule[]>;
  enableRule(id: string): Promise<NotificationRule>;
  disableRule(id: string): Promise<NotificationRule>;
}
