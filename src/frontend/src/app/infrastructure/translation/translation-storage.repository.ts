import { Injectable } from '@angular/core';
import { TranslationRepositoryPort } from '../../application/translation/translation-repository-port';
import { Translation } from '../../domain/translation/models/translation';
import { TranslationRequest } from '../../domain/translation/models/translation-request';
import { TranslationId } from '../../domain/translation/models/translation-id';
import { TranslatedPage } from '../../domain/translation/models/translated-page';
import { TranslationUrl } from '../../domain/translation/models/translation-url';
import { Language } from '../../domain/translation/language';
import { LANGUAGES } from '../../domain/translation/languages';
import { COUNTRIES } from '../../domain/translation/countries';
import { Country } from '../../domain/translation/country';
import { SearchQuery } from '../../domain/translation/models/search-query';
import { LanguageCountryPair } from '../../domain/translation/models/language-country-pair';

@Injectable({
  providedIn: 'root'
})
export class TranslationStorageRepository implements TranslationRepositoryPort {

  private readonly TRANSLATIONS_KEY: string = 'stored_translations';
  private readonly LAST_REQUEST_KEY: string = 'last_translation_request';

  saveTranslations(translations: Translation[]): void {
    try {
      const serialised = translations.map(
        (t: Translation) => ({
          id: t.getId().toString(),
          page: {
            body: t.getPage().getBody(),
            translatedAt: t.getPage().getTranslatedAt().toISOString(),
          },
          url: t.getUrl().toString(),
          createdAt: t.getCreatedAt().toISOString(),
        })
      );
    } catch (err) {
      console.error('Error saving translations', err);
      throw new Error('Failed to save translations.');
    }
  }
  findAllTranslations(): Translation[] {
    try {
      const stored: string | null = sessionStorage.getItem(this.TRANSLATIONS_KEY);
      if (!stored) return [];
      const parsed: any = JSON.parse(stored);
      return parsed.map((item: any) => new Translation(
          new TranslationId(item.id),
          new TranslatedPage(item.page.body, new Date(item.page.translatedAt)),
          new TranslationUrl(item.url),
          new Date(item.createdAt)
        )
      );
    } catch (err) {
      console.error('Error retrieving translations', err);
      return [];
    }
  }
  findTranslationById(id: string): Translation | null {
    const translations: Translation[] = this.findAllTranslations();
    return translations.find((t: Translation) => t.getId().toString() === id) || null;
  }

  saveLastRequest(request: TranslationRequest): void {
    try {
     const serialised = {
       query: request.getSearchQuery().toString(),
       langCode: request.getLanguageCountryPair().getLanguage().langValue,
       ctryCode: request.getLanguageCountryPair().getCountry().ctryValue,
     };
     sessionStorage.setItem(this.LAST_REQUEST_KEY, JSON.stringify(serialised));
    } catch (err) {
      console.error('Error saving last request', err);
    }
  }
  findLastRequest(): TranslationRequest | null {
    try {
      const stored: string | null = sessionStorage.getItem(this.LAST_REQUEST_KEY);
      if (!stored) return null;
      const parsed: any = JSON.parse(stored);
      const language: Language | undefined = LANGUAGES.find((l: Language) => l.langValue === parsed.langCode);
      const country: Country = COUNTRIES[parsed.ctryCode as keyof  typeof COUNTRIES];
      if (!language || !country) return null;
      return new TranslationRequest(
        new SearchQuery(parsed.query),
        new LanguageCountryPair(language, country)
      );
    } catch (err) {
      console.error('Error retrieving last request', err);
      return null;
    }
  }

  clearAllTranslations(): void {
    sessionStorage.removeItem(this.TRANSLATIONS_KEY);
  }
}
