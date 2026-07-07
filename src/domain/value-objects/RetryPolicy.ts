export class RetryPolicy {
  private readonly _maxRetries: number;
  private readonly _delayMs: number;
  private readonly _backoffMultiplier: number;

  constructor(maxRetries: number, delayMs: number, backoffMultiplier?: number) {
    if (maxRetries < 0) {
      throw new Error('Max retries cannot be negative');
    }
    if (delayMs < 0) {
      throw new Error('Delay cannot be negative');
    }
    this._maxRetries = maxRetries;
    this._delayMs = delayMs;
    this._backoffMultiplier = backoffMultiplier ?? 1;
  }

  get maxRetries(): number {
    return this._maxRetries;
  }

  get delayMs(): number {
    return this._delayMs;
  }

  get backoffMultiplier(): number {
    return this._backoffMultiplier;
  }

  getDelayForAttempt(attempt: number): number {
    return this._delayMs * Math.pow(this._backoffMultiplier, attempt);
  }

  equals(other: RetryPolicy): boolean {
    return (
      this._maxRetries === other._maxRetries &&
      this._delayMs === other._delayMs &&
      this._backoffMultiplier === other._backoffMultiplier
    );
  }
}
