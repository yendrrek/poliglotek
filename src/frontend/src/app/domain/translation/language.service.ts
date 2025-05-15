// LANGUAGE SERVICE: Domain logic for languages and countries
import { Injectable } from '@angular/core';
import { Language } from './models/language';
import { COUNTRIES } from './constants/countries';
import { LANGUAGES } from './constants/languages';
import { Country } from './models/country';
import { LANG_COUNTRY_MATCH } from './constants/lang-country-match';
import { LanguageValue } from './types/language-value';
import { COUNTRY } from './constants/country';
import { TranslationRequest } from '../../infrastructure/translation/translation-request';
import { CountryValue } from './types/country-value';

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
    const match: Country | Country[] = LANG_COUNTRY_MATCH[langCode];
    if (!match) return [];
    if (!Array.isArray(match)) return [match];
    return this.sortAlphabetically([...match], 'ctryViewValue');
  }

  getDefaultCountryForLanguage(langCode: LanguageValue): Country | null {
    return COUNTRY[langCode] || null;
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
