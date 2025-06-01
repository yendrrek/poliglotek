export class TranslationId {

  constructor(private readonly value: string) {
    if (!value || value.trim().length === 0) {
      throw new Error('TranslationId cannot be empty');
    }
  }

  toString(): string {
    return this.value;
  }

  equals(other: TranslationId): boolean {
    return this.value === other.value;
  }
}
