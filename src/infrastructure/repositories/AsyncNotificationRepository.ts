import { NotificationRepository } from '../../../application/repositories/NotificationRepository';
import { NotificationRule } from '../../../domain/entities/NotificationRule';
import { AsyncStorageClient, StorageKeys } from '../../storage';
import { NotificationMapper, NotificationRuleStorageModel } from '../../mappers';

export class AsyncNotificationRepository implements NotificationRepository {
  private readonly storage: AsyncStorageClient;

  constructor(storage?: AsyncStorageClient) {
    this.storage = storage ?? new AsyncStorageClient();
  }

  async saveRule(rule: NotificationRule): Promise<void> {
    const rules = await this.findRules();
    const index = rules.findIndex(r => r.getId() === rule.getId());
    if (index === -1) {
      rules.push(rule);
    } else {
      rules[index] = rule;
    }
    await this.persistRules(rules);
  }

  async deleteRule(id: string): Promise<void> {
    const rules = await this.findRules();
    const filtered = rules.filter(r => r.getId() !== id);
    if (filtered.length === rules.length) {
      throw new Error(`Notification rule with id "${id}" not found`);
    }
    await this.persistRules(filtered);
  }

  async findRules(): Promise<NotificationRule[]> {
    const data = await this.storage.load<NotificationRuleStorageModel[]>(StorageKeys.NOTIFICATIONS);
    if (!data) {
      return [];
    }
    return data.map(NotificationMapper.fromStorage);
  }

  async enableRule(id: string): Promise<void> {
    const rules = await this.findRules();
    const rule = rules.find(r => r.getId() === id);
    if (!rule) {
      throw new Error(`Notification rule with id "${id}" not found`);
    }
    const updated = rule.enable();
    await this.saveRule(updated);
  }

  async disableRule(id: string): Promise<void> {
    const rules = await this.findRules();
    const rule = rules.find(r => r.getId() === id);
    if (!rule) {
      throw new Error(`Notification rule with id "${id}" not found`);
    }
    const updated = rule.disable();
    await this.saveRule(updated);
  }

  private async persistRules(rules: NotificationRule[]): Promise<void> {
    const models = rules.map(NotificationMapper.toStorage);
    await this.storage.save(StorageKeys.NOTIFICATIONS, models);
  }
}
