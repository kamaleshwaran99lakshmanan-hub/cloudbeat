import { HealthStatus } from '../enums';
import { ResponseTime } from '../value-objects';

export class HealthCheck {
  private readonly _serviceId: string;
  private readonly _timestamp: Date;
  private readonly _status: HealthStatus;
  private readonly _responseTime: ResponseTime;

  constructor(
    serviceId: string,
    timestamp: Date,
    status: HealthStatus,
    responseTime: ResponseTime
  ) {
    this._serviceId = serviceId;
    this._timestamp = timestamp;
    this._status = status;
    this._responseTime = responseTime;
  }

  get serviceId(): string {
    return this._serviceId;
  }

  get timestamp(): Date {
    return this._timestamp;
  }

  get status(): HealthStatus {
    return this._status;
  }

  get responseTime(): ResponseTime {
    return this._responseTime;
  }
}
