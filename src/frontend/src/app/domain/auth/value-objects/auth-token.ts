export class AuthToken {

  constructor(
    private readonly value: string,
    private readonly expiresAt?: Date
  ) {
    this.validate();
  }

  private validate(): void {
    if (!this.value || this.value.trim().length === 0) {
      throw new Error('Auth token cannot be empty');
    }
  }

  toString(): string {
    return this.value;
  }

  isExpired(): boolean {
    if (!this.expiresAt) return false;
    return new Date() > this.expiresAt;
  }

  equals(other: AuthToken): boolean {
    return this.value === other.value;
  }
}
