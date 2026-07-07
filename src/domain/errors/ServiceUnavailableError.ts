export class ServiceUnavailableError extends Error {
  constructor(serviceName: string) {
    super(`Service unavailable: ${serviceName}`);
    this.name = 'ServiceUnavailableError';
  }
}
