import { Injectable } from '@angular/core';
import { TranslatedPage } from '../models/translated-page';

@Injectable({
  providedIn: 'root'
})
export class CachedTranslatedPageService {
  private translatedPages: TranslatedPage[] = [];

  setTranslatedPages(translatedPages: TranslatedPage[]): void {
    this.translatedPages = translatedPages;
    sessionStorage.setItem('translations', JSON.stringify(translatedPages));
  }

  getTranslatedPages(): TranslatedPage[] {
    const storedtranslatedPages: string | null = sessionStorage.getItem('translations');
    if (storedtranslatedPages) {
      this.translatedPages = JSON.parse(storedtranslatedPages);
    }
    return this.translatedPages;
  }
}
