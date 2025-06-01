import { Component, OnDestroy, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, FormsModule, ReactiveFormsModule, Validators } from '@angular/forms';
import { AsyncPipe, NgOptimizedImage } from '@angular/common';
import { MatTab, MatTabGroup } from '@angular/material/tabs';
import { MatFormField, MatLabel, MatSuffix } from '@angular/material/form-field';
import { MatOption, MatSelect } from '@angular/material/select';
import { MatInput } from '@angular/material/input';
import { MatIcon } from '@angular/material/icon';
import { MatButton, MatIconButton } from '@angular/material/button';
import { MatProgressSpinnerModule } from '@angular/material/progress-spinner';
import { MatDialog } from '@angular/material/dialog';
import { Observable, Subscription } from 'rxjs';
import { DialogNotificationComponent } from '../shared/ui-elements/dialog-notification/dialog-notification.component';
import { Language } from '../../domain/translation/language';
import { Country } from '../../domain/translation/country';
import { Translation } from '../../domain/translation/translation';
import { LanguageValue } from '../../domain/translation/language-value';
import { TranslationRequest } from '../../infrastructure/translation/translation-request';
import { TranslationResponsiveDirective } from './translation-responsive.directive';
import { MatTooltip } from '@angular/material/tooltip';
import { TranslationStateService } from './translation-state.service';
import { CountryValue } from '../../domain/translation/country-value';
import { AuthFacadeService } from '../../application/auth/auth-facade.service';
import { TranslationDialogMessage } from '../../application/translation/translation-dialog-message';

@Component({
  selector: 'home',
  imports: [MatTab, MatTabGroup, MatFormField, MatLabel,
    MatSelect, MatOption, MatInput, MatSuffix, MatIcon, MatIconButton,
    FormsModule, MatButton, MatProgressSpinnerModule, ReactiveFormsModule, NgOptimizedImage,
    TranslationResponsiveDirective, AsyncPipe, MatTooltip],
  templateUrl: 'translation.component.html',
  styleUrl: './translation.component.scss'
})
export class TranslationComponentOLD implements OnInit, OnDestroy {

  // State observables
  languages: Observable<Language[]>;
  countries: Observable<Country[]>;
  autoSelectedCountries: Observable<Country[]>;
  nonSelectedCountries: Observable<Country[]>;
  translations: Observable<Translation[]>;
  isLoading: Observable<boolean>;
  isLoggedIn?: Observable<boolean>;

  translationForm: FormGroup = new FormGroup({});
  readonly noAccessMessage: string = 'Brak dostępu. Zaloguj się, aby aktywować wyszukiwanie.';
  private subscriptions: Subscription = new Subscription();

  constructor(
    private formBuilder: FormBuilder,
    private dialog: MatDialog,
    private translationStateService: TranslationStateService,
    private authFacadeService: AuthFacadeService,
  ) {
    // Subscribe to state observables
    this.languages = this.translationStateService.languages;
    this.countries = this.translationStateService.countries;
    this.autoSelectedCountries = this.translationStateService.autoSelectedCountries;
    this.nonSelectedCountries = this.translationStateService.nonSelectedCountries;
    this.translations = this.translationStateService.translations;
    this.isLoading = this.translationStateService.isLoading;
    this.isLoggedIn = this.authFacadeService.isLoggedIn;
  }

  ngOnInit(): void {
    this.initForm();
    const langSub: Subscription | undefined = this.translationForm.get('langCode')?.valueChanges.subscribe(
      (selected: LanguageValue) => {
        const defaultCtry: CountryValue = this.translationStateService.updateSelectedLanguage(selected);
        this.translationForm.get('countryCode')?.setValue(defaultCtry);
      });
    if (langSub) {
      this.subscriptions.add(langSub);
    }
  }

  ngOnDestroy(): void {
    this.subscriptions.unsubscribe();
  }

  clearQueryField(): void {
    this.translationForm.get('query')?.setValue('');
  }

  toggleTooltip(tooltip: MatTooltip): void {
    let isLoggedIn: boolean = false;
    const loginSub: Subscription | undefined = this.isLoggedIn?.subscribe(
      (value: boolean) => {
        isLoggedIn = value;
      });
    this.subscriptions.add(loginSub);
    if (!isLoggedIn) {
      tooltip.toggle();
    }
  }

  handleTranslation(): void {
    if (!this.translationForm.valid) return;
    const choice: TranslationRequest = this.translationForm.value;
    this.translationStateService.processTranslation(choice).subscribe((message: string | null) => {
      if (message) this.showMessageToUser(message);
    });
  }

  private initForm(): void {
    const previous: TranslationRequest = this.translationStateService.getPreviousChoice();
    this.translationForm = this.formBuilder.group({
      query: [previous.query, Validators.required],
      langCode: [previous.langCode, Validators.required],
      countryCode: [previous.ctryCode, Validators.required],
    });
  }

  private showMessageToUser(msg: string): void {
    this.dialog.open(DialogNotificationComponent, { data: { message: msg } as TranslationDialogMessage });
  }
}
