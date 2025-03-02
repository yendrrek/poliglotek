import { Injectable } from '@angular/core';
import { TranslatedPage } from '../models/translated-page';
import { TranslationFormInput } from '../models/translation-form-input';

@Injectable({
  providedIn: 'root'
})
export class CacheService {

  private readonly TRANSLATIONS_KEY: 'translations' = 'translations';
  private readonly TRANSLATION_REQUEST_KEY: 'translationRequest' = 'translationRequest';

  /**
   * Stores translated pages in session storage
   * @param translatedPages Array of translated pages to store
   */

  setTranslatedPages(translatedPages: TranslatedPage[]): void {
    try {
      sessionStorage.setItem('translations', JSON.stringify(translatedPages));
    } catch (err) {
      console.error('Failed to store translated pages', err);
    }
  }

  /**
   * Retrieves translated pages from session storage
   * @returns Array of TranslatedPage objects or empty array if none found
   */

  getTranslatedPages(): TranslatedPage[] {
    try {
      const storedTranslatedPages: string | null = sessionStorage.getItem(this.TRANSLATIONS_KEY);
      return storedTranslatedPages ? JSON.parse(storedTranslatedPages) : [];
    } catch (err) {
      console.error('Error parsing translated pages stored as JSON', err);
      return [];
    }
  }

  /**
   * Stores the most recent translation request in session storage
   * @param translationInput The translation form input to store
   */

  setTranslationChoice(translationInput: TranslationFormInput): void {
    try {
      sessionStorage.setItem(this.TRANSLATION_REQUEST_KEY, JSON.stringify(translationInput));
    } catch (err) {
      console.error('Failed to store translation request', err);
    }
  }

  /**
   * Retrieves the most recent translation request from session storage
   * @returns TranslationFormInput object or null if none found
   */

  getTranslationChoice(): TranslationFormInput | null {
    try {
      const recentRequest: string | null = sessionStorage.getItem(this.TRANSLATION_REQUEST_KEY);
      return recentRequest ? JSON.parse(recentRequest) as TranslationFormInput : null;
    } catch (err) {
      console.error('Error parsing translation request stored as JSON', err);
      return null;
    }
  }

  /**
   * Clears all translation-related data from session storage
   */

  clearCache(): void {
    try {
      sessionStorage.removeItem(this.TRANSLATIONS_KEY);
      sessionStorage.removeItem(this.TRANSLATION_REQUEST_KEY);
    } catch (err) {
      console.error('Error clearing cache', err);
    }
  }
}
