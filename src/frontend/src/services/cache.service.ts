import { Injectable } from '@angular/core';
import { Translation } from '../models/translation';
import { TranslationFormInput } from '../models/translation-form-input';

@Injectable({
  providedIn: 'root'
})
export class CacheService {

  private readonly TRANSLATIONS_KEY: 'translations' = 'translations';
  private readonly TRANSLATION_REQUEST_KEY: 'translationRequest' = 'translationRequest';

  setTranslatedPages(translatedPages: Translation[]): void {
    try {
      sessionStorage.setItem('translations', JSON.stringify(translatedPages));
    } catch (err) {
      console.error('Failed to store translated pages in browser session storage', err);
    }
  }

  getTranslatedPages(): Translation[] {
    try {
      const storedTranslatedPages: string | null = sessionStorage.getItem(this.TRANSLATIONS_KEY);
      return storedTranslatedPages ? JSON.parse(storedTranslatedPages) : [];
    } catch (err) {
      console.error('Error parsing translated pages stored as JSON', err);
      return [];
    }
  }

  setTranslationChoice(translationInput: TranslationFormInput): void {
    try {
      sessionStorage.setItem(this.TRANSLATION_REQUEST_KEY, JSON.stringify(translationInput));
    } catch (err) {
      console.error('Failed to store translation request', err);
    }
  }

  getTranslationChoice(): TranslationFormInput | null {
    try {
      const recentRequest: string | null = sessionStorage.getItem(this.TRANSLATION_REQUEST_KEY);
      return recentRequest ? JSON.parse(recentRequest) as TranslationFormInput : null;
    } catch (err) {
      console.error('Error parsing translation request stored as JSON', err);
      return null;
    }
  }

  clearCache(): void {
    try {
      sessionStorage.removeItem(this.TRANSLATIONS_KEY);
      sessionStorage.removeItem(this.TRANSLATION_REQUEST_KEY);
    } catch (err) {
      console.error('Error clearing cache', err);
    }
  }
}
