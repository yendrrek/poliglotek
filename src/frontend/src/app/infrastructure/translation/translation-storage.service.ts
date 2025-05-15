import { Injectable } from '@angular/core';
import { Translation } from '../../domain/translation/translation';
import { TranslationRequest } from './translation-request';

@Injectable({
  providedIn: 'root'
})
export class TranslationStorageService {

  private readonly CHOICE_KEY: 'translation_choice' = 'translation_choice';
  private readonly TRANSLATIONS_KEY: 'stored_translations' = 'stored_translations';

  retrieveChoice(): TranslationRequest {
    const defaultChoice: TranslationRequest = { query: '', langCode: '', ctryCode: '' };
    try {
      const stored: string | null = sessionStorage.getItem(this.CHOICE_KEY);
      return stored ? JSON.parse(stored) as TranslationRequest : defaultChoice;
    } catch (err) {
      console.error('Error retrieving translation choice', err);
      return defaultChoice;
    }
  }

  saveChoice(choice: TranslationRequest): void {
    try {
      sessionStorage.setItem(this.CHOICE_KEY, JSON.stringify(choice));
    } catch (err) {
      console.error('Error storing translation choice', err);
    }
  }

  retrieveTranslations(): Translation[] {
    try {
      const stored: string | null = sessionStorage.getItem(this.TRANSLATIONS_KEY);
      return stored ? JSON.parse(stored) : [];
    } catch (err) {
      console.error('Error retrieving translations', err);
    }
    return [];
  }

  saveTranslations(translations: Translation[]): void {
    try {
      sessionStorage.setItem(this.TRANSLATIONS_KEY, JSON.stringify(translations));
    } catch (err) {
      console.error('Error saving translations', err);
    }
  }
}
