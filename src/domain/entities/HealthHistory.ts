import { HealthCheck } from './HealthCheck';

export class HealthHistory {
  private readonly _serviceId: string;
  private readonly _checks: readonly HealthCheck[];

  constructor(serviceId: string, checks: readonly HealthCheck[]) {
    this._serviceId = serviceId;
    this._checks = checks;
  }

  get serviceId(): string {
    return this._serviceId;
  }

  get checks(): readonly HealthCheck[] {
    return this._checks;
  }

  get latestCheck(): HealthCheck | undefined {
    if (this._checks.length === 0) {
      return undefined;
    }
    return this._checks[this._checks.length - 1];
  }

  withCheck(check: HealthCheck): HealthHistory {
    return new HealthHistory(this._serviceId, [...this._checks, check]);
  }
}
