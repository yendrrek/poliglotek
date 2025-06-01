import { Injectable } from '@angular/core';
import { TranslationRequest } from './models/translation-request';
import { Language } from './language';
import { Country } from './country';
import { COUNTRY_SINGLE_AND_MULTI_MATCH } from './lang-country-match';
import { LanguageValue } from './language-value';
import { ONE_COUNTRY_FROM_MULTI_MATCH } from './one-country-from-multi-match';
import { LANGUAGES } from './languages';
import { COUNTRIES } from './countries';
import { SearchQuery } from './models/search-query';
import { LanguageCountryPair } from './models/language-country-pair';

@Injectable({
  providedIn: 'root'
})
export class TranslationDomainService {

  isDuplicateRequest(current: TranslationRequest, previous: TranslationRequest): boolean {
    return current.equals(previous);
  }

  buildDuplicateMessage(request: TranslationRequest): string {
    const language: Language = request.getLanguageCountryPair().getLanguage();
    const country: Country = request.getLanguageCountryPair().getCountry();
    const query: string = request.getSearchQuery().toString();

    const lowQuote = '\u201E';
    return `Rezultaty wybranych przez Ciebie opcji ` +
      `${lowQuote}${query}", ${lowQuote}${language.langViewValue}", ` +
      `${lowQuote}${country.ctryViewValue}" są już wyświetlone.`;
  }

  getCompatibleCountries(language: Language): Country[] {
    const match: Country | Country[] = COUNTRY_SINGLE_AND_MULTI_MATCH[language.langValue as LanguageValue];
    if (!match) return [];
    const countries: Country[] = Array.isArray(match) ? match : [match];
    return this.sortCountriesAlphabetically(countries);
  }

  getDefaultCountryForLanguage(language: Language): Country {
    const multiMatch: Country | undefined = ONE_COUNTRY_FROM_MULTI_MATCH[language.langValue as LanguageValue];
    if (multiMatch) return multiMatch;

    const singleMatch: Country | Country[] = COUNTRY_SINGLE_AND_MULTI_MATCH[language.langValue as LanguageValue];
    return Array.isArray(singleMatch) ? singleMatch[0] : singleMatch as Country;
  }

  isValidLanguageCountryPair(language: Language, country: Country): boolean {
    const compatibleCountries: Country[] = this.getCompatibleCountries(language);
    return compatibleCountries.some((c: Country) => c.ctryValue === country.ctryValue);
  }

  createTranslationRequest(query: string, langCode: string, ctryCode: string): TranslationRequest {
    const lang: Language | undefined = LANGUAGES.find(l => l.langValue === langCode);
    const ctry: Country = COUNTRIES[ctryCode as keyof typeof COUNTRIES];
    if (!lang || !ctry) {
      throw new Error('Invalid language or country');
    }
    const searchQuery: SearchQuery = new SearchQuery(query);
    const languageCountryPair: LanguageCountryPair = new LanguageCountryPair(lang, ctry);
    if (!this.isValidLanguageCountryPair(lang, ctry)) {
      throw new Error(`Country ${ctry.ctryViewValue} is not compatible with language ${lang.langViewValue}`);
    }
    return new TranslationRequest(searchQuery, languageCountryPair);
  }

  private sortCountriesAlphabetically(countries: Country[]): Country[] {
    return [...countries].sort((a: Country, b: Country) =>
      a.ctryViewValue.localeCompare(b.ctryViewValue)
    );
  }
}
