export class GoogleClientId {

  constructor(private readonly value: string) {
    this.validate();
  }

  private validate(): void {
    if (!this.value || this.value.trim().length === 0) {
      throw new Error('Google client ID cannot be empty');
    }
  }

  toString(): string {
    return this.value;
  }

  equals(other: GoogleClientId): boolean {
    return this.value === other.value;
  }
}
