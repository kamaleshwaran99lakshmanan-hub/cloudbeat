import { NotificationChannel } from '../enums';

export class NotificationSettings {
  private readonly _enabled: boolean;
  private readonly _channels: readonly NotificationChannel[];
  private readonly _threshold: number;

  constructor(
    enabled: boolean,
    channels: readonly NotificationChannel[],
    threshold: number
  ) {
    this._enabled = enabled;
    this._channels = channels;
    this._threshold = threshold;
  }

  get enabled(): boolean {
    return this._enabled;
  }

  get channels(): readonly NotificationChannel[] {
    return this._channels;
  }

  get threshold(): number {
    return this._threshold;
  }

  hasChannel(channel: NotificationChannel): boolean {
    return this._channels.includes(channel);
  }

  equals(other: NotificationSettings): boolean {
    return (
      this._enabled === other._enabled &&
      this._threshold === other._threshold &&
      this._channels.length === other._channels.length &&
      this._channels.every((c) => other._channels.includes(c))
    );
  }
}
