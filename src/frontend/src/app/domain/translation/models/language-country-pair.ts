import { Language } from '../language';
import { Country } from '../country';

export class LanguageCountryPair {

  constructor(
    private readonly language: Language,
    private readonly country: Country
  ) {
    this.validate();
  }

  private validate(): void {
    if (!this.language || !this.country) {
      throw new Error('Language and country are required.');
    }
  }

  getLanguage(): Language {
    return this.language;
  }

  getCountry(): Country {
    return this.country;
  }

  equals(other: LanguageCountryPair): boolean {
    return this.language.langValue === other.language.langValue &&
      this.country.ctryValue === other.country.ctryValue;
  }

  toString(): string {
    return `${this.language.langValue}-${this.country.ctryValue}`;
  }
}
