import { NotificationRule } from '../../domain/entities/NotificationRule';
import { NotificationChannel } from '../../domain/enums/NotificationChannel';
import { NotificationSettings } from '../../domain/value-objects/NotificationSettings';

export interface NotificationRuleStorageModel {
  id: string;
  serviceId: string;
  channel: NotificationChannel;
  isEnabled: boolean;
  threshold: number | null;
  minIntervalMs: number | null;
  createdAt: string;
  updatedAt: string;
}

export class NotificationMapper {
  static toStorage(entity: NotificationRule): NotificationRuleStorageModel {
    const settings = entity.getSettings();
    return {
      id: entity.getId(),
      serviceId: entity.getServiceId(),
      channel: entity.getChannel(),
      isEnabled: entity.isEnabled(),
      threshold: settings?.getThreshold() ?? null,
      minIntervalMs: settings?.getMinIntervalMs() ?? null,
      createdAt: entity.getCreatedAt().toISOString(),
      updatedAt: entity.getUpdatedAt().toISOString(),
    };
  }

  static fromStorage(model: NotificationRuleStorageModel): NotificationRule {
    const settings = model.threshold !== null || model.minIntervalMs !== null
      ? new NotificationSettings(
          model.threshold ?? undefined,
          model.minIntervalMs ?? undefined
        )
      : undefined;

    return new NotificationRule(
      model.id,
      model.serviceId,
      model.channel,
      model.isEnabled,
      settings,
      new Date(model.createdAt),
      new Date(model.updatedAt)
    );
  }
}
