import { Injectable } from '@angular/core';
import { TranslatedPage } from '../models/translated-page';
import { TranslationFormInput } from '../models/translation-form-input';

@Injectable({
  providedIn: 'root'
})
export class CacheService {

  setTranslatedPages(translatedPages: TranslatedPage[]): void {
    sessionStorage.setItem('translations', JSON.stringify(translatedPages));
  }

  getTranslatedPages(): TranslatedPage[] {
    const storedTranslatedPages: string | null = sessionStorage.getItem('translations');
    return storedTranslatedPages ? JSON.parse(storedTranslatedPages) : [];
  }

  setTranslationChoice(recentQuery: TranslationFormInput): void {
    sessionStorage.setItem('translationRequest', JSON.stringify(recentQuery));
  }

  getTranslationChoice(): TranslationFormInput {
    const recentQuery: string | null = sessionStorage.getItem('translationRequest');
    return recentQuery ? JSON.parse(recentQuery) : null;
  }
}
