export class SearchQuery {

  private static readonly MIN_LENGTH: 2 = 2;
  private static readonly MAX_LENGTH: 100 = 100;

  constructor(private readonly value: string) {
    this.validate();
  }

  private validate(): void {
    const trimmed = this.value.trim();
    if (trimmed.length < SearchQuery.MIN_LENGTH) {
      throw new Error(`Search query must be at least ${SearchQuery.MIN_LENGTH} characters long`);
    }
    if (trimmed.length > SearchQuery.MAX_LENGTH) {
      throw new Error(`Search query must not exceed ${SearchQuery.MAX_LENGTH} characters`);
    }
  }

  toString(): string {
    return this.value;
  }

  equals(other: SearchQuery): boolean {
    return this.toString() === other.toString();
  }

  contains(term: string): boolean {
    return this.toString().toLowerCase().includes(term.toLowerCase());
  }
}
