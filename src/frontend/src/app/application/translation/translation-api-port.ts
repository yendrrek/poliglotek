import { TranslationRequest } from '../../domain/translation/models/translation-request';
import { Observable } from 'rxjs';
import { InjectionToken } from '@angular/core';
import { TranslationResponse } from '../../infrastructure/translation/translation-response';

export interface TranslationApiPort {
  translate(request: TranslationRequest): Observable<TranslationResponse>
}

export const TRANSLATION_API_PORT = new InjectionToken<TranslationApiPort>('TranslationApiPort');
