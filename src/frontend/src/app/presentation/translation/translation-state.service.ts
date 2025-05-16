import { Injectable } from '@angular/core';
import { TranslationRequest } from '../../infrastructure/translation/translation-request';
import { TranslationResponse } from '../../infrastructure/translation/translation-response';
import { BehaviorSubject, catchError, map, Observable, of, tap } from 'rxjs';
import { Translation } from '../../domain/translation/translation';
import { Language } from '../../domain/translation/models/language';
import { TranslationApplicationService } from '../../application/translation/translation-application.service';
import { LanguageService } from '../../domain/translation/language.service';
import { Country } from '../../domain/translation/models/country';
import { LanguageValue } from '../../domain/translation/types/language-value';
import { CountryValue } from '../../domain/translation/types/country-value';

@Injectable({
  providedIn: 'root'
})
export class TranslationStateService {

  // State management
  private _languages: BehaviorSubject<Language[]> = new BehaviorSubject<Language[]>([]);
  private _countries: BehaviorSubject<Country[]> = new BehaviorSubject<Country[]>([]);
  private _autoSelectedCountries: BehaviorSubject<Country[]> = new BehaviorSubject<Country[]>([]);
  private _nonSelectedCountries: BehaviorSubject<Country[]> = new BehaviorSubject<Country[]>([]);
  private _translations: BehaviorSubject<Translation[]> = new BehaviorSubject<Translation[]>([]);
  private _isLoading: BehaviorSubject<boolean> = new BehaviorSubject<boolean>(false);

  // Exposing state as observables
  readonly languages: Observable<Language[]> = this._languages.asObservable();
  readonly countries: Observable<Country[]> = this._countries.asObservable();
  readonly autoSelectedCountries: Observable<Country[]> = this._autoSelectedCountries.asObservable();
  readonly nonSelectedCountries: Observable<Country[]> = this._nonSelectedCountries.asObservable();
  readonly translations: Observable<Translation[]> = this._translations.asObservable();
  readonly isLoading: Observable<boolean> = this._isLoading.asObservable();

  constructor(private translationApplicationService: TranslationApplicationService,
              private languageService: LanguageService) {
    // Initialize state
    this._languages.next(this.languageService.getSortedLanguages());
    this._countries.next(this.languageService.getSortedCountries());
    this._translations.next(this.translationApplicationService.retrieveStoredTranslations());
  }

  updateSelectedLanguage(langCode: LanguageValue): CountryValue {
    const matchedCountries: Country[] = this.languageService.getCountriesForLanguage(langCode);
    this._autoSelectedCountries.next(matchedCountries);
    const allCountries: Country[] = this._countries.value;
    const nonSelected: Country[] = allCountries.filter(
      (ctry: Country) => !matchedCountries.some(
        (selected: Country) => selected.ctryValue === ctry.ctryValue));
    this._nonSelectedCountries.next(nonSelected);
    return this.languageService.getDefaultCountryForLanguage(langCode).ctryValue;
  }

  processTranslation(choice: TranslationRequest): Observable<string | null> {
    if (this.translationApplicationService.isDuplicateChoice(choice)) {
      const message: string = this.languageService.buildDuplicateSearchMessage(choice);
      return of(message);
    }
    this._isLoading.next(true);
    return this.translationApplicationService.translate(choice).pipe(
      tap((resp: TranslationResponse) => {
        this._isLoading.next(false);
        if (resp.success) {
          this.translationApplicationService.updateStoredChoice(choice);
          const validTranslations: Translation[] = resp.data.filter((t: Translation) => t != null);
          this._translations.next(validTranslations);
          return resp.warning || null;
        }
        return resp.error;
      }),
      map((resp: TranslationResponse) => resp.success ? resp.warning || null : resp.error),
      catchError((err: any) => {
        this._isLoading.next(false);
        return of('Brak dostępu. Zaloguj się, aby aktywować wyszukiwanie.');
      })
    );
  }

  getPreviousChoice(): TranslationRequest {
    return this.translationApplicationService.getPreviousChoice();
  }
}
