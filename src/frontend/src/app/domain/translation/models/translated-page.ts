export class TranslatedPage {

  constructor(
    private readonly body: string,
    private readonly translatedAt: Date = new Date()
  ) {
    if (!body || body.trim().length === 0) {
      throw new Error('Translated page body cannot be empty.');
    }
  }

  getBody(): string {
    return this.body;
  }

  getTranslatedAt(): Date {
    return this.translatedAt;
  }

  getWordCount(): number {
    return this.body.split(/\s+/).filter((word: string) => word.length > 0).length;
  }

  contains(searchTerm: string): boolean {
    return this.body.toLowerCase().includes(searchTerm.toLowerCase());
  }
}
