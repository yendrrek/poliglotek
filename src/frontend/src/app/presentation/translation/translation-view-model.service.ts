import { Language } from '../../domain/translation/language';
import { Country } from '../../domain/translation/country';
import { Translation } from '../../domain/translation/models/translation';
import { Injectable } from '@angular/core';
import { BehaviorSubject, catchError, map, Observable, of, tap } from 'rxjs';
import { TranslationDomainService } from '../../domain/translation/translation-domain.service';
import { LanguageService } from '../../domain/translation/language.service';
import { AuthFacadeService } from '../../application/auth/auth-facade.service';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { TranslationApplicationService } from '../../application/translation/translation-application.service';
import { TranslationRequest } from '../../domain/translation/models/translation-request';

export interface TranslationViewModel {
  languages: Language[];
  allCountries: Country[];
  compatibleCountries: Country[];
  nonCompatibleCountries: Country[];
  translations: Translation[];
  isLoading: boolean;
  isAuthenticated: boolean;
  selectedLanguage?: Language;
  selectedCountry?: Country;
  errorMessage?: string;
}

@Injectable({
  providedIn: 'root'
})
export class TranslationViewModelService {

  private  state: BehaviorSubject<TranslationViewModel> = new BehaviorSubject<TranslationViewModel>({
    languages: [],
    allCountries: [],
    compatibleCountries: [],
    nonCompatibleCountries: [],
    translations: [],
    isLoading: false,
    isAuthenticated: false,
  });
  readonly viewModel: Observable<TranslationViewModel> = this.state.asObservable();
  readonly isLoading: Observable<boolean> = this.state.pipe(map(s => s.isLoading));
  readonly translations: Observable<Translation[]> = this.state.pipe(map(s => s.translations));
  readonly languages: Observable<Language[]> = this.state.pipe(map(s => s.languages));
  readonly compatibleCountries: Observable<Country[]> = this.state.pipe(
    map(s => s.compatibleCountries));
  readonly nonCompatibleCountries: Observable<Country[]> = this.state.pipe(
    map(s => s.nonCompatibleCountries));

  constructor(
    private translationApplicationService: TranslationApplicationService,
    private translationDomainService: TranslationDomainService,
    private languageService: LanguageService,
    private authFacadeService: AuthFacadeService,
    private formBuilder: FormBuilder
  ) {
    this.initialiseViewModel();
  }

  private initialiseViewModel(): void {
    const languages: Language[] = this.languageService.getSortedLanguages();
    const allCountries: Country[] = this.languageService.getSortedCountries();
    const storedTranslations: Translation[] | null = this.translationApplicationService.getStoredTranslations();

    this.updateState({
      languages,
      allCountries,
      translations: storedTranslations
    });

    this.authFacadeService.isAuthenticated.subscribe((isAuthenticated: boolean) => {
      this.updateState({ isAuthenticated });
    });
  }

  createTranslationForm(): FormGroup {
    const lastRequest: TranslationRequest | null = this.translationApplicationService.getLastRequest();
    const initialValues = lastRequest ? {
      query: lastRequest?.getSearchQuery().toString(),
      langCode: lastRequest?.getLanguageCountryPair().getLanguage().langValue,
      countryCode: lastRequest?.getLanguageCountryPair().getCountry().ctryValue
    } : {
      query: '',
      langCode: '',
      countryCode: ''
    };
    return this.formBuilder.group({
      query: [initialValues.query,
        [Validators.required, Validators.minLength(2), Validators.maxLength(100)]],
      langCode: [initialValues.langCode, [Validators.required]],
      countryCode: [initialValues.countryCode, [Validators.required]]
    });
  }

  updateSelectedLanguage(language: Language): void {
    const compatibleCountries: Country[] = this.translationDomainService.getCompatibleCountries(language);
    const defaultCountry: Country = this.translationDomainService.getDefaultCountryForLanguage(language);
    const currentSite: TranslationViewModel = this.state.value;
    const nonCompatibleCountries: Country[] = currentSite.allCountries.filter(
      country => !compatibleCountries.some(
        c => c.ctryValue === country.ctryValue));
    this.updateState({
      selectedLanguage: language,
      selectedCountry: defaultCountry,
      compatibleCountries,
      nonCompatibleCountries
    });
  }

  processTranslation(formValues: any): Observable<void> {
    if (!this.state.value.isAuthenticated) {
      this.updateState({ errorMessage: 'Brak dostępu. Zaloguj się, aby aktywować wyszukiwanie.' });
      return of(undefined);
    }
    try {
      const request = this.translationDomainService.createTranslationRequest(
        formValues.query,
        formValues.langCode,
        formValues.countryCode
      );
      return this.translationApplicationService.processTranslationRequest(request).pipe(
        tap(result => {
          this.updateState({
            isLoading: false,
            translations: result.translations,
            errorMessage: result.message
          });
        }),
        map(() => undefined),
        catchError(err => {
          this.updateState({
            isLoading: false,
            errorMessage: err.message || 'Wystąpił błąd podczas tłumaczenia. Spróbuj ponownie.'
          });
          return of(undefined);
        })
      );
    } catch (err: any) {
      this.updateState({
        isLoading: false,
        errorMessage: err.message || 'Nieprawidłowe dane formularza'
      });
      return of(undefined);
    }
  }

  clearError(): void {
    this.updateState({ errorMessage: undefined });
  }

  getCurrentState(): TranslationViewModel {
    return this.state.value;
  }

  private updateState(partial: Partial<TranslationViewModel>): void {
    this.state.next({ ...this.state.value, ...partial });
  }
}
