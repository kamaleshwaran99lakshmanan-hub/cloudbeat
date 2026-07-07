export class ResponseTime {
  private readonly _value: number;

  constructor(milliseconds: number) {
    if (milliseconds < 0) {
      throw new Error('Response time cannot be negative');
    }
    this._value = milliseconds;
  }

  get value(): number {
    return this._value;
  }

  get seconds(): number {
    return this._value / 1000;
  }

  equals(other: ResponseTime): boolean {
    return this._value === other._value;
  }

  isGreaterThan(other: ResponseTime): boolean {
    return this._value > other._value;
  }

  isLessThan(other: ResponseTime): boolean {
    return this._value < other._value;
  }

  toString(): string {
    return `${this._value}ms`;
  }
}
