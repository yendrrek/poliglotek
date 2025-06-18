import { Inject, Injectable } from '@angular/core';
import { Translation } from '../../domain/translation/models/translation';
import { TRANSLATION_API_PORT, TranslationApiPort } from './translation-api-port';
import { TRANSLATION_REPOSITORY_PORT, TranslationRepositoryPort } from './translation-repository-port';
import { TranslationRequest } from '../../domain/translation/models/translation-request';
import { map, Observable, of } from 'rxjs';
import { TranslationDomainService } from '../../domain/translation/translation-domain.service';
import { TranslationProcessResult } from '../../domain/translation/models/translation-process-result';
import { TranslationResponse } from '../../infrastructure/translation/translation-response';

@Injectable({
  providedIn: 'root'
})
export class TranslationApplicationService {

  constructor(
    @Inject(TRANSLATION_REPOSITORY_PORT) private translationRepository: TranslationRepositoryPort,
    @Inject(TRANSLATION_API_PORT) private translationApi: TranslationApiPort,
    private translationDomainService: TranslationDomainService
  ) {}

  processTranslationRequest(request: TranslationRequest): Observable<TranslationProcessResult> {
    const lastRequest: TranslationRequest | null = this.translationRepository.findLastRequest();
    if (lastRequest && this.translationDomainService.isDuplicateRequest(request, lastRequest)) {
      return of({
        success: true,
        translations: this.translationRepository.findAllTranslations(),
        message: this.translationDomainService.buildDuplicateMessage(request),
        isDuplicate: true
      });
    }
    return this.translationApi.translate(request).pipe(
      map((result: TranslationResponse) => {
        if (result.success) {
          this.translationRepository.saveTranslations(result.data);
          this.translationRepository.saveLastRequest(request);
        }
        return {
          success: result.success,
          translations: result.data,
          message: result.warning || result.error,
          isDuplicate: false
        };
      })
    );
  }

  getStoredTranslations(): Translation[] {
    return this.translationRepository.findAllTranslations();
  }

  getLastRequest(): TranslationRequest | null {
    return this.translationRepository.findLastRequest();
  }

  clearTranslationHistory(): void {
    this.translationRepository.clearAllTranslations();
  }
}
