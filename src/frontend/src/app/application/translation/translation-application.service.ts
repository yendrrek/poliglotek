import { Injectable } from '@angular/core';
import { TranslationApiService } from '../../infrastructure/translation/translation-api.service';
import { TranslationStorageService } from '../../infrastructure/translation/translation-storage.service';
import { TranslationDomainService } from '../../domain/translation/translation-domain.service';
import { TranslationRequest } from '../../infrastructure/translation/translation-request';
import { Translation } from '../../domain/translation/translation';
import { TranslationResponse } from '../../infrastructure/translation/translation-response';
import { Observable, tap } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class TranslationApplicationService {

  constructor(private translationDomainService: TranslationDomainService,
              private translationStorageService: TranslationStorageService,
              private translationApiService: TranslationApiService) {}

  isDuplicateChoice(current: TranslationRequest): boolean {
    const previous: TranslationRequest = this.getPreviousChoice();
    return this.translationDomainService.compareChoices(previous, current);
  }

  getPreviousChoice(): TranslationRequest {
    return this.translationStorageService.retrieveChoice();
  }

  updateStoredChoice(choice: TranslationRequest): void {
    this.translationStorageService.saveChoice(choice);
  }

  retrieveStoredTranslations(): Translation[] {
    return this.translationStorageService.retrieveTranslations();
  }

  updateStoredTranslations(translations: Translation[]): void {
    this.translationStorageService.saveTranslations(translations);
  }

  translate(choice: TranslationRequest): Observable<TranslationResponse> {
    return this.translationApiService.translate(choice).pipe(
      tap((resp: TranslationResponse) => {
        if (resp.success) {
          this.updateStoredTranslations(resp.data);
        }
      })
    );
  }
}
