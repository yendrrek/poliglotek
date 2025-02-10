import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, FormsModule, ReactiveFormsModule, Validators } from '@angular/forms';
import { HttpErrorResponse } from '@angular/common/http';
import { NgOptimizedImage } from '@angular/common';
import { MatTab, MatTabGroup } from '@angular/material/tabs';
import { MatFormField, MatLabel, MatSuffix } from '@angular/material/form-field';
import { MatOption, MatSelect } from '@angular/material/select';
import { MatInput } from '@angular/material/input';
import { MatIcon } from '@angular/material/icon';
import { MatButton, MatIconButton } from '@angular/material/button';
import { MatProgressSpinnerModule } from '@angular/material/progress-spinner';
import { MatDialog, MatDialogConfig } from '@angular/material/dialog';
import { Observable } from 'rxjs';
import { DialogNotificationComponent } from '../../components/dialog-notification/dialog-notification.component';
import { Language } from '../../models/language';
import { Country } from '../../models/country';
import { TranslatedPage } from '../../models/translated-page';
import { Response } from '../../models/response';
import { LanguageValue } from '../../types/language-value';
import { TranslationService } from '../../services/translation.service';
import { LoaderService } from '../../services/loader.service';
import { LANGUAGES } from '../../constants/languages';
import { COUNTRIES } from '../../constants/countries';
import { LANG_COUNTRY_MATCH } from '../../constants/lang-country-match';
import { ONE_COUNTRY_FROM_MANY } from '../../constants/one-country-from-many';
import { handleHttpError } from '../../utils/utils';
import { CacheService } from '../../services/cache.service';
import { TranslationFormInput } from '../../models/translation-form-input';
import { CountryValue } from '../../types/country-value';

@Component({
  selector: 'home',
  imports: [MatTab, MatTabGroup, MatFormField, MatLabel,
    MatSelect, MatOption, MatInput, MatSuffix, MatIcon, MatIconButton,
    FormsModule, MatButton, MatProgressSpinnerModule, ReactiveFormsModule, NgOptimizedImage],
  templateUrl: './translation.component.html',
  styleUrl: './translation.component.scss'
})
export class TranslationComponent implements OnInit {

  title: string = 'frontend';
  languages: Language[] = LANGUAGES.sort((a: Language, b: Language) =>
    a.languageViewValue.localeCompare(b.languageViewValue));
  countries: Country[] = Object.values(COUNTRIES).sort((a: Country, b: Country) =>
    a.countryViewValue.localeCompare(b.countryViewValue));
  dynamicCountries: Country[] = [];
  isLoading: boolean = false;
  translatedPages: TranslatedPage[] = [];
  translationForm: FormGroup = new FormGroup({});

  constructor(
    private translationService: TranslationService,
    private formBuilder: FormBuilder,
    private loaderService: LoaderService,
    private dialog: MatDialog,
    private cacheService: CacheService
  ) {
  }

  ngOnInit(): void {
    this.translationForm = this.formBuilder.group({
      query: ['', Validators.required],
      langCode: ['', Validators.required],
      countryCode: ['', Validators.required],
    });
    this.autoSelectOneOrMoreMatchingCountries();
    this.loaderService.isLoading.subscribe((loading: boolean) => this.isLoading = loading);
    this.handleCachedTranslatedPages();
  }

  handleSubmitSearchData(): void {
    if (!this.translationForm.valid) return;
    const choice: TranslationFormInput = this.translationForm.value;
    if (this.checkForDuplicateChoice(choice)) return;
    this.processTranslationRequest(choice);
  }

  private checkForDuplicateChoice(currentChoice: TranslationFormInput): boolean {
    const previousChoice: TranslationFormInput = this.cacheService.getTranslationChoice();
    if (this.isDuplicateChoice(previousChoice, currentChoice)) {
      const dialogMessage: string = this.buildDialogMessage(previousChoice, currentChoice);
      this.openDialog(dialogMessage);
      return true;
    }
    return false;
  }

  private isDuplicateChoice(previous: TranslationFormInput, current: TranslationFormInput): boolean {
    return previous && Object.keys(current).every((key: string) =>
      previous[key as keyof TranslationFormInput].trim() === current[key as keyof TranslationFormInput].trim());
  }

  private buildDialogMessage(previousChoice: TranslationFormInput, currentChoice: TranslationFormInput): string {
    const currentLanguage: string = this.getCurrentLanguageChoice(currentChoice);
    const currentCountry: string = this.getCurrentCountryChoice(currentChoice);
    const lowQuote = '\u201E';
    return `Rezultaty wybranych przez Ciebie opcji
        ${lowQuote}${previousChoice.query}", ${lowQuote}${currentLanguage}", ${lowQuote}${currentCountry}"
        są już wyświetlone.`;
  }

  private getCurrentLanguageChoice(currentChoice: TranslationFormInput): string {
    return LANGUAGES.filter((lang: Language) =>
      lang.languageValue === currentChoice.langCode)[0].languageViewValue;
  }

  private getCurrentCountryChoice(currentChoice: TranslationFormInput): string {
    return COUNTRIES[currentChoice.countryCode as keyof Record<CountryValue, Country>].countryViewValue;
  }

  private processTranslationRequest(choice: TranslationFormInput): void {
    this.translationService.getTranslatedPages(choice).subscribe({
      next: (resp: Response<TranslatedPage[]>): void => {
        this.handleTranslationResponse(resp, choice);
      },
      error: (error: HttpErrorResponse): Observable<never> => {
        return handleHttpError(error);
      }
    });
  }

  private handleTranslationResponse(resp: Response<TranslatedPage[]>, choice: TranslationFormInput): void {
    if (!resp.success) {
      this.openDialog(resp.error);
      return;
    }
    this.updateCacheAndTranslatedPages(resp.data, choice);
    if (resp.warning) {
      this.openDialog(resp.warning);
    }
  }

  private updateCacheAndTranslatedPages(pages: TranslatedPage[], choice: TranslationFormInput): void {
    this.translatedPages = pages.filter((page: TranslatedPage) => page != null);
    this.cacheService.setTranslationChoice(choice);
    this.cacheService.setTranslatedPages(this.translatedPages);
  }

  private handleCachedTranslatedPages(): void {
    const cachedTranslatedPages: TranslatedPage[] = this.cacheService.getTranslatedPages();
    if (!cachedTranslatedPages.length) return;
    this.translatedPages = cachedTranslatedPages;
  }

  private autoSelectOneOrMoreMatchingCountries(): void {
    this.translationForm.get('langCode')?.valueChanges.subscribe((selectedValue: LanguageValue) => {
      if (LANG_COUNTRY_MATCH[selectedValue] === null) {
        console.error(`Language code '${selectedValue}' must have a matching country for automatic selection.`);
        return;
      }
      if (!Array.isArray(LANG_COUNTRY_MATCH[selectedValue])) {
        const oneMatchingCountry: Country = LANG_COUNTRY_MATCH[selectedValue];
        this.autoSelectOneCountry(oneMatchingCountry);
        return;
      }
      const moreMatchingCountries: Country[] = LANG_COUNTRY_MATCH[selectedValue];
      this.autoSelectMoreMatchingCountries(moreMatchingCountries);
      const oneCountryFromMany: Country | undefined = ONE_COUNTRY_FROM_MANY[selectedValue];
      this.autoSelectOneCountry(oneCountryFromMany);
    });
  }

  private autoSelectOneCountry(oneMatchingCountry: Country | undefined): void {
    this.translationForm.get('countryCode')?.setValue(oneMatchingCountry?.countryValue);
  }

  private autoSelectMoreMatchingCountries(moreMatchingCountries: Country[]): void {
    this.dynamicCountries = moreMatchingCountries.sort((a: Country, b: Country) =>
      a.countryViewValue.localeCompare(b.countryViewValue));
    this.dynamicCountries.forEach((dynamicCountry: Country) => {
      this.countries = this.countries.filter((country: Country) =>
        country.countryValue !== dynamicCountry.countryValue);
    });
  }

  private openDialog(message: string): void {
    const dialogConfig: MatDialogConfig = {
      data: {
        error: message }
    };
    this.dialog.open(DialogNotificationComponent, dialogConfig);
  }
}
