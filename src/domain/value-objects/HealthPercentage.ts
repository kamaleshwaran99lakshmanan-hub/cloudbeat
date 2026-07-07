export class HealthPercentage {
  private readonly _value: number;

  constructor(percentage: number) {
    if (percentage < 0 || percentage > 100) {
      throw new Error('Health percentage must be between 0 and 100');
    }
    this._value = percentage;
  }

  get value(): number {
    return this._value;
  }

  equals(other: HealthPercentage): boolean {
    return this._value === other._value;
  }

  isHealthy(): boolean {
    return this._value >= 95;
  }

  isDegraded(): boolean {
    return this._value >= 50 && this._value < 95;
  }

  isCritical(): boolean {
    return this._value < 50;
  }

  toString(): string {
    return `${this._value}%`;
  }
}
