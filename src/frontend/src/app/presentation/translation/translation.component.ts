import { Component, inject, OnDestroy, OnInit } from '@angular/core';
import { map, Observable, Subject, takeUntil } from 'rxjs';
import { AbstractControl, FormGroup, ReactiveFormsModule } from '@angular/forms';
import { TranslationViewModel, TranslationViewModelService } from './translation-view-model.service';
import { MatDialog } from '@angular/material/dialog';
import { MatTooltip } from '@angular/material/tooltip';
import { DialogNotificationComponent } from '../shared/ui-elements/dialog-notification/dialog-notification.component';
import { TranslationDialogMessage } from '../../application/translation/translation-dialog-message';
import { AsyncPipe } from '@angular/common';
import { MatProgressSpinner } from '@angular/material/progress-spinner';
import { MatFormField } from '@angular/material/form-field';
import { MatIcon } from '@angular/material/icon';
import { MatButton, MatIconButton } from '@angular/material/button';
import { TranslationResponsiveDirective } from './translation-responsive.directive';
import { MatInput } from '@angular/material/input';
import { MatOption, MatSelect } from '@angular/material/select';
import { MatTab, MatTabGroup } from '@angular/material/tabs';
import { Translation } from '../../domain/translation/models/translation';
import { Language } from '../../domain/translation/language';
import { Country } from '../../domain/translation/country';

@Component({
  selector: 'translation',
  imports: [
    AsyncPipe,
    MatProgressSpinner,
    ReactiveFormsModule,
    MatFormField,
    MatIcon,
    MatIconButton,
    TranslationResponsiveDirective,
    MatInput,
    MatSelect,
    MatOption,
    MatButton,
    MatTooltip,
    MatTabGroup,
    MatTab
  ],
  templateUrl: './translation.component.html',
  styleUrl: './translation.component.scss'
})
export class TranslationComponent implements OnInit, OnDestroy {

  translationForm: FormGroup;
  private readonly viewModelService: TranslationViewModelService = inject(TranslationViewModelService);
  private readonly dialog: MatDialog = inject(MatDialog);
  private destroy: Subject<void> = new Subject<void>();
  private isAuthenticated: boolean = false;
  viewModel: Observable<TranslationViewModel> = this.viewModelService.viewModel;

  isLoading: Observable<boolean> = this.viewModelService.isLoading;
  translations: Observable<Translation[]> = this.viewModelService.translations;

  protected readonly languages: Observable<Language[]> = this.viewModelService.languages;
  protected readonly compatibleCountries: Observable<Country[]> = this.viewModelService.compatibleCountries;
  protected readonly nonCompatibleCountries: Observable<Country[]> = this.viewModelService.nonCompatibleCountries;

  protected readonly noAccessMessage: string = 'Brak dostępu. Zaloguj się, aby aktywować wyszukiwanie.';

  constructor() {
    this.translationForm = this.viewModelService.createTranslationForm();
  }

  ngOnInit(): void {
    this.translationForm.get('langCode')?.valueChanges
      .pipe(
        takeUntil(this.destroy)
      )
      .subscribe((langCode: string) => {
        const currentState = this.viewModelService.getCurrentState();
        const language = currentState.languages?.find((l: Language) => l.langValue === langCode);
        if (language) {
          this.viewModelService.updateSelectedLanguage(language);
        }
      });

    this.viewModelService.viewModel
      .pipe(
        takeUntil(this.destroy),
        map((vm: TranslationViewModel) => vm.selectedCountry)
      )
      .subscribe((selectedCountry: Country | undefined) => {
        if (selectedCountry) {
          const currentCountryValue = this.translationForm.get('countryCode')?.value;
          if (currentCountryValue !== selectedCountry.ctryValue) {
            this.translationForm.get('countryCode')?.setValue(selectedCountry.ctryValue, { emitEvent: false });
          }
        }
      });

    this.viewModel
      .pipe(
        takeUntil(this.destroy),
        map((vm: TranslationViewModel): string | undefined => vm.errorMessage)
      )
      .subscribe((errorMessage: string | undefined) => {
        if (errorMessage) {
          this.showMessageToUser(errorMessage);
          this.viewModelService.clearError();
        }
      });

    this.viewModel
      .pipe(
        takeUntil(this.destroy),
        map((vm: TranslationViewModel) => vm.isAuthenticated)
      )
      .subscribe((isAuthenticated: boolean) => {
        this.isAuthenticated = isAuthenticated;
      });
  }


  ngOnDestroy(): void {
    this.destroy.next();
    this.destroy.complete();
  }

  clearQueryField(): void {
    this.translationForm.get('query')?.setValue('');
  }

  toggleTooltip(tooltip: MatTooltip): void {
    if (!this.isAuthenticated) {
      tooltip.toggle();
    }
  }

  handleTranslation(): void {
    if (!this.translationForm.valid) {
      this.markFormGroupTouched(this.translationForm);
      return;
    }
    this.viewModelService.processTranslation(this.translationForm.value).pipe(takeUntil(this.destroy)).subscribe();
  }

  private markFormGroupTouched(formGroup: FormGroup): void {
    Object.keys(formGroup.controls).forEach(key => {
      const control: AbstractControl<any, any> | null = formGroup.get(key);
      control?.markAsTouched();
    });
  }

  private showMessageToUser(message: string): void {
    this.dialog.open(DialogNotificationComponent, {
      data: { message } as TranslationDialogMessage
    });
  }
}
