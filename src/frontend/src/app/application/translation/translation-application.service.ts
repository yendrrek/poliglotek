import { Inject, Injectable } from '@angular/core';
import { Translation } from '../../domain/translation/models/translation';
import { TRANSLATION_API_PORT, TranslationApiPort, TranslationResult } from './translation-api-port';
import { TRANSLATION_REPOSITORY_PORT, TranslationRepositoryPort } from './translation-repository-port';
import { TranslationRequest } from '../../domain/translation/models/translation-request';
import { map, Observable, of } from 'rxjs';
import { TranslationDomainService } from '../../domain/translation/translation-domain.service';
import { TranslationProcessResult } from '../../domain/translation/models/translation-process-result';

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
      map((result: TranslationResult) => {
        if (result.success) {
          this.translationRepository.saveTranslations(result.translations);
          this.translationRepository.saveLastRequest(request);
        }
        return {
          success: result.success,
          translations: result.translations,
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

  removeOldTranslations(hoursThreshold: number): void { // TODO: I don't think I'll need this
    const translations: Translation[] = this.translationRepository.findAllTranslations();
    const recentTranslations: Translation[] = translations.filter(
      (t: Translation) => !t.isOlderThan(hoursThreshold)
    );
    this.translationRepository.saveTranslations(recentTranslations);
  }
}
