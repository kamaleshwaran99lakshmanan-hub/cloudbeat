export class InvalidConfigurationError extends Error {
  constructor(message: string) {
    super(`Invalid configuration: ${message}`);
    this.name = 'InvalidConfigurationError';
  }
}
