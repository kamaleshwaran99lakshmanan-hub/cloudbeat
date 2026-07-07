export class ServiceUrl {
  private readonly _value: string;

  constructor(url: string) {
    if (!this.isValidUrl(url)) {
      throw new Error('Invalid URL format');
    }
    this._value = url;
  }

  get value(): string {
    return this._value;
  }

  private isValidUrl(url: string): boolean {
    try {
      new URL(url);
      return true;
    } catch {
      return false;
    }
  }

  equals(other: ServiceUrl): boolean {
    return this._value === other._value;
  }

  toString(): string {
    return this._value;
  }
}
