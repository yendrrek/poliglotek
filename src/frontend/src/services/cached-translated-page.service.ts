import { Injectable } from '@angular/core';
import { TranslatedPage } from '../models/translated-page';

@Injectable({
  providedIn: 'root'
})
export class CachedTranslatedPageService {
  private translatedPages: TranslatedPage[] = [];

  setTranslatedPage(translatedPages: TranslatedPage[]): void {
    this.translatedPages = translatedPages;
  }

  getTranslatedPage(): TranslatedPage[] {
    return this.translatedPages;
  }

  clearTranslation(): void {
    this.translatedPages = [];
  }
}
