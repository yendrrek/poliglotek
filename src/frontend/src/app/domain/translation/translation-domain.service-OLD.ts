import { Injectable } from '@angular/core';
import { TranslationRequest } from '../../infrastructure/translation/translation-request';

@Injectable({
  providedIn: 'root'
})
export class TranslationDomainService {

  compareChoices(a: TranslationRequest, b: TranslationRequest): boolean {
    return a.query === b.query && a.langCode === b.langCode && a.ctryCode === b.ctryCode;
  }
}
