import { NotificationChannel } from '../enums';
import { NotificationSettings } from '../value-objects';

export class NotificationRule {
  private readonly _id: string;
  private readonly _serviceId: string;
  private readonly _channel: NotificationChannel;
  private readonly _settings: NotificationSettings;

  constructor(
    id: string,
    serviceId: string,
    channel: NotificationChannel,
    settings: NotificationSettings
  ) {
    this._id = id;
    this._serviceId = serviceId;
    this._channel = channel;
    this._settings = settings;
  }

  get id(): string {
    return this._id;
  }

  get serviceId(): string {
    return this._serviceId;
  }

  get channel(): NotificationChannel {
    return this._channel;
  }

  get settings(): NotificationSettings {
    return this._settings;
  }

  withSettings(settings: NotificationSettings): NotificationRule {
    return new NotificationRule(this._id, this._serviceId, this._channel, settings);
  }
}
