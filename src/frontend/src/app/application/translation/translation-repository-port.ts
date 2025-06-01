import { Translation } from '../../domain/translation/models/translation';
import { TranslationRequest } from '../../domain/translation/models/translation-request';
import { InjectionToken } from '@angular/core';

export interface TranslationRepositoryPort {

  saveTranslations(translations: Translation[]): void;
  findAllTranslations(): Translation[];
  findTranslationById(id: string): Translation | null;
  saveLastRequest(request: TranslationRequest): void
  findLastRequest(): TranslationRequest | null;
  clearAllTranslations(): void;
}

export const TRANSLATION_REPOSITORY_PORT =
  new InjectionToken<TranslationRepositoryPort>('TranslationRepositoryPort');
