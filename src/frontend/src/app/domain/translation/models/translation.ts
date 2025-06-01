import { TranslationId } from './translation-id';
import { TranslatedPage } from './translated-page';
import { TranslationUrl } from './translation-url';

export class Translation {

  constructor(
    private readonly id: TranslationId,
    private readonly page: TranslatedPage,
    private readonly url: TranslationUrl,
    private readonly createdAt: Date = new Date()
  ) {}

  getId(): TranslationId {
    return this.id;
  }

  getPage(): TranslatedPage {
    return this.page;
  }

  getUrl(): TranslationUrl {
    return this.url;
  }

  getCreatedAt(): Date {
    return this.createdAt;
  }

  isFromDomain(domain: string): boolean {
    return this.url.isFromDomain(domain);
  }

  containsSearchTerm(term: string): boolean {
    return this.page.contains(term);
  }

  isOlderThan(hours: number): boolean {
    const hoursInMs = hours * 60 * 60 * 1000;
    return Date.now() - this.createdAt.getTime() > hoursInMs;
  }
}
