export class InvalidUrlError extends Error {
  constructor(url: string) {
    super(`Invalid URL: ${url}`);
    this.name = 'InvalidUrlError';
  }
}
