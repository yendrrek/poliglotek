export class Email {

  private static readonly EMAIL_REGEX = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;

  constructor(private readonly value: string) {
    this.validate();
  }

  private validate(): void {
    if (!this.value || !Email.EMAIL_REGEX.test(this.value)) {
      throw new Error('Invalid email format');
    }
  }

  toString(): string {
    return this.value;
  }

  equals(other: Email): boolean {
    return this.value.toLowerCase() === other.value.toLowerCase();
  }

  getDomain(): string {
    return this.value.split('@')[1];
  }
}
