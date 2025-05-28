import { Injectable } from '@angular/core';
import { Language } from './language';
import { COUNTRIES } from './countries';
import { LANGUAGES } from './languages';
import { Country } from './country';
import { COUNTRY_SINGLE_AND_MULTI_MATCH } from './lang-country-match';
import { LanguageValue } from './language-value';
import { ONE_COUNTRY_FROM_MULTI_MATCH } from './one-country-from-multi-match';
import { TranslationRequest } from '../../infrastructure/translation/translation-request';
import { CountryValue } from './country-value';

@Injectable({
  providedIn: 'root'
})
export class LanguageService {

  getSortedLanguages(): Language[] {
    return this.sortAlphabetically([...LANGUAGES], 'langViewValue');
  }

  getSortedCountries(): Country[] {
    return this.sortAlphabetically([...Object.values(COUNTRIES)], 'ctryViewValue');
  }

  getCountriesForLanguage(langCode: LanguageValue): Country[] {
    const match: Country | Country[] = COUNTRY_SINGLE_AND_MULTI_MATCH[langCode];
    if (!match) return [];
    if (!Array.isArray(match)) return [match];
    return this.sortAlphabetically([...match], 'ctryViewValue');
  }

  getDefaultCountryForLanguage(langCode: LanguageValue): Country {
    return ONE_COUNTRY_FROM_MULTI_MATCH[langCode] || COUNTRY_SINGLE_AND_MULTI_MATCH[langCode] as Country;
  }

  buildDuplicateSearchMessage(choice: TranslationRequest): string {
    const lang: string = LANGUAGES.filter((l: Language) => l.langValue === choice.langCode)[0].langViewValue;
    const ctry: string = COUNTRIES[choice.ctryCode as keyof Record<CountryValue, Country>].ctryViewValue;
    const lowQuote = '\u201E';
    return `Rezultaty wybranych przez Ciebie opcji
        ${lowQuote}${choice?.query}", ${lowQuote}${lang}", ${lowQuote}${ctry}"
        są już wyświetlone.`;
  }

  private sortAlphabetically<T>(items: T[], viewValue: keyof T): T[] {
    return [...items].sort((a: T, b: T) => String(a[viewValue]).localeCompare(String(b[viewValue])));
  }
}
