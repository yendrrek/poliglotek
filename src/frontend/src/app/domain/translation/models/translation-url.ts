export class TranslationUrl {

  private readonly url: URL;

  constructor(value: string) {
    try {
      this.url = new URL(value);
      this.validate();
    } catch {
      throw new Error(`Invalid URL format: ${value}`);
    }
  }

  private validate(): void {
    if (!['http:', 'https:'].includes(this.url.protocol)) {
      throw new Error(`URL must use HTTP or HTTPS. Invalid protocol: ${this.url.protocol}`);
    }
  }

  toString(): string {
    return this.url.toString();
  }

  getDomain(): string {
    return this.url.hostname;
  }

  isFromDomain(domain: string): boolean {
    return this.url.hostname.includes(domain);
  }

  equals(other: TranslationUrl): boolean {
    return this.toString() === other.toString();
  }
}
