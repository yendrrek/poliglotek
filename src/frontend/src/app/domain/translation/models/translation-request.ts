import { SearchQuery } from './search-query';
import { LanguageCountryPair } from './language-country-pair';

export class TranslationRequest {

  constructor(
    private readonly searchQuery: SearchQuery,
    private readonly languageCountryPair: LanguageCountryPair
  ) {}

  getSearchQuery(): SearchQuery {
    return this.searchQuery;
  }

  getLanguageCountryPair(): LanguageCountryPair {
    return this.languageCountryPair;
  }

  equals(other: TranslationRequest): boolean {
    return this.searchQuery.equals(other.searchQuery) &&
      this.languageCountryPair.equals(other.languageCountryPair);
  }

  toApiRequest(): { query: string, langCode: string; ctryCode: string } {
    return {
      query: this.searchQuery.toString(),
      langCode: this.languageCountryPair.getLanguage().langValue,
      ctryCode: this.languageCountryPair.getCountry().ctryValue,
    };
  }
}
