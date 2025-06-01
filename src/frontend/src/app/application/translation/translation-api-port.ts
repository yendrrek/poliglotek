import { TranslationRequest } from '../../domain/translation/models/translation-request';
import { Observable } from 'rxjs';
import { Translation } from '../../domain/translation/models/translation';
import { InjectionToken } from '@angular/core';

export interface TranslationApiPort {

  translate(request: TranslationRequest): Observable<TranslationResult>
}

export interface TranslationResult {
  success: boolean;
  translations: Translation[];
  warning?: string;
  error?: string;
}

export const TRANSLATION_API_PORT = new InjectionToken<TranslationApiPort>('TranslationApiPort');
