import { TranslationId } from './translation-id';
import { TranslatedPage } from './translated-page';
import { TranslationUrl } from './translation-url';

export class Translation {

  constructor(
    private readonly id: TranslationId,
    private readonly page: TranslatedPage,
    private readonly url: TranslationUrl,
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

  isFromDomain(domain: string): boolean {
    return this.url.isFromDomain(domain);
  }

  containsSearchTerm(term: string): boolean {
    return this.page.contains(term);
  }
}
