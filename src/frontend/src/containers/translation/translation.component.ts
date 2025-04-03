import { Component, OnDestroy, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, FormsModule, ReactiveFormsModule, Validators } from '@angular/forms';
import { HttpErrorResponse } from '@angular/common/http';
import { AsyncPipe, NgOptimizedImage } from '@angular/common';
import { MatTab, MatTabGroup } from '@angular/material/tabs';
import { MatFormField, MatLabel, MatSuffix } from '@angular/material/form-field';
import { MatOption, MatSelect } from '@angular/material/select';
import { MatInput } from '@angular/material/input';
import { MatIcon } from '@angular/material/icon';
import { MatButton, MatIconButton } from '@angular/material/button';
import { MatProgressSpinnerModule } from '@angular/material/progress-spinner';
import { MatDialog, MatDialogConfig } from '@angular/material/dialog';
import { Observable, Subscription } from 'rxjs';
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
import { TranslationFormResponsiveDirective } from '../../directives/translation-form-responsive.directive';
import { AuthService } from '../../services/auth.service';
import { MatTooltip } from '@angular/material/tooltip';

@Component({
  selector: 'home',
  imports: [MatTab, MatTabGroup, MatFormField, MatLabel,
    MatSelect, MatOption, MatInput, MatSuffix, MatIcon, MatIconButton,
    FormsModule, MatButton, MatProgressSpinnerModule, ReactiveFormsModule, NgOptimizedImage,
    TranslationFormResponsiveDirective, AsyncPipe, MatTooltip],
  template: `
    @if (isLoading) {
      <div class="spinner-overlay">
        <mat-spinner mode="indeterminate"></mat-spinner>
      </div>
    }

    <form class="search-form-container" [formGroup]="translationForm" formResponsive>
      <mat-form-field class="search-form--query-input-width" hideRequiredMarker floatLabel="always" formFieldResponsive>
        <mat-label formFieldResponsive>Szukana fraza po polsku</mat-label>
        <input required matInput type="text" formControlName="query">
        @if (translationForm.get('query')?.value) {
          <button matSuffix mat-icon-button aria-label="Clear"
                  (click)="translationForm.get('query')?.setValue('')">
            <mat-icon>close</mat-icon>
          </button>
        }
      </mat-form-field>

      <mat-form-field class="select-distance select-width" hideRequiredMarker floatLabel="always" formFieldResponsive>
        <mat-label formFieldResponsive>Tłumacz frazę na</mat-label>
        <mat-select required formControlName="langCode">
          @for (language of languages; track language.languageValue) {
            <mat-option [value]="language.languageValue">{{ language.languageViewValue }}</mat-option>
          }
        </mat-select>
      </mat-form-field>

      <mat-form-field class="select-distance select-width" hideRequiredMarker floatLabel="always" formFieldResponsive>
        <mat-label formFieldResponsive>Kraj wyników</mat-label>
        <mat-select required formControlName="countryCode">
          @if (dynamicCountries) {
            @for (dynamicCountry of dynamicCountries;
              let isLastDynamicCountry = $last ;
              let isFirstDynamicCountry = $first;
              track dynamicCountry.countryViewValue) {
              <mat-option class="dynamic-countries-border"
                          [class.first-country-item]="isFirstDynamicCountry"
                          [class.last-country-item]="isLastDynamicCountry"
                          [value]="dynamicCountry.countryValue">{{ dynamicCountry.countryViewValue }}
              </mat-option>
            }
          }
          @for (country of countries; track country.countryValue) {
            <mat-option [value]="country.countryValue">{{ country.countryViewValue }}</mat-option>
          }
        </mat-select>
      </mat-form-field>

      <button [disabled]="!(isLoggedIn | async)"
              class="search-button"
              disabledInteractive
              mat-raised-button
              [matTooltip]="!(isLoggedIn | async) ? 'Zaloguj się przez Google aby aktywować wyszukiwanie' : ''"
              #tooltip="matTooltip"
              (touchstart)="toggleTooltip(tooltip)"
              searchButtonReponsive (click)="handleSubmitSearchData()">Szukaj
      </button>
    </form>

    <div class="header-container">
      <span>Tłumacznie znalezionych stron na polski:</span>
    </div>

    <mat-tab-group class="tabs-container">
      @for (page of translatedPages; let i = $index; track page.id) {
        <mat-tab [label]="'Strona ' + (i + 1)">
          <div class="translatedPageContainer" [innerHTML]="page.body"></div>
          <a [href]="page.url" target="_blank" class="source-url">Źródło</a>
          <img class="attribution-logo" ngSrc="img/google-attribution.svg" alt="Google attribution image"
               height="16" width="122">
        </mat-tab>
      }
    </mat-tab-group>

    <!-- TODO: For testing only. Comment out when not needed -->
    <!--    <mat-tab-group class="tabs-container">-->
    <!--      @for (page of [1, 2, 3, 4]; let i = $index; track page) {-->
    <!--        <mat-tab [label]="'Strona ' + (i + 1)">-->
    <!--          <div class="translated-page-container" [innerHTML]="'Sed ut perspiciatis unde omnis iste natus error sit voluptatem accusantium doloremque laudantium, totam rem aperiam, eaque ipsa quae ab illo inventore veritatis et quasi architecto beatae vitae dicta sunt explicabo. Nemo enim ipsam voluptatem quia voluptas sit aspernatur aut odit aut fugit, sed quia consequuntur magni dolores eos qui ratione voluptatem sequi nesciunt. Neque porro quisquam est, qui dolorem ipsum quia dolor sit amet, consectetur, adipisci velit, sed quia non numquam eius modi tempora incidunt ut labore et dolore magnam aliquam quaerat voluptatem. Ut enim ad minima veniam, quis nostrum exercitationem ullam corporis suscipit laboriosam, nisi ut aliquid ex ea commodi consequatur? Quis autem vel eum iure reprehenderit qui in ea voluptate velit esse quam nihil molestiae consequatur, vel illum qui dolorem eum fugiat quo voluptas nulla pariatur?0Sed ut perspiciatis unde omnis iste natus error sit voluptatem accusantium doloremque laudantium, totam rem aperiam, eaque ipsa quae ab illo inventore veritatis et quasi architecto beatae vitae dicta sunt explicabo. Nemo enim ipsam voluptatem quia voluptas sit aspernatur aut odit aut fugit, sed quia consequuntur magni dolores eos qui ratione voluptatem sequi nesciunt. Neque porro quisquam est, qui dolorem ipsum quia dolor sit amet, consectetur, adipisci velit, sed quia non numquam eius modi tempora incidunt ut labore et dolore magnam aliquam quaerat voluptatem. Ut enim ad minima veniam, quis nostrum exercitationem ullam corporis suscipit laboriosam, nisi ut aliquid ex ea commodi consequatur? Quis autem vel eum iure reprehenderit qui in ea voluptate velit esse quam nihil molestiae consequatur, vel illum qui dolorem eum fugiat quo voluptas nulla pariatur?' + i"></div>-->
    <!--          <a [href]="'www.test.com'" target="_blank" class="source-url">Źródło</a>-->
    <!--          <img class="attribution-logo" ngSrc="img/google-attribution.svg" alt="Google attribution image" height="16" width="122">-->
    <!--        </mat-tab>-->
    <!--      }-->
    <!--    </mat-tab-group>-->
  `,
  styleUrl: './translation.component.scss'
})
export class TranslationComponent implements OnInit, OnDestroy {

  title: string = 'frontend';
  languages: Language[] = LANGUAGES.sort((a: Language, b: Language) =>
    a.languageViewValue.localeCompare(b.languageViewValue));
  countries: Country[] = Object.values(COUNTRIES).sort((a: Country, b: Country) =>
    a.countryViewValue.localeCompare(b.countryViewValue));
  dynamicCountries: Country[] = [];
  isLoading: boolean = false;
  translatedPages: TranslatedPage[] = [];
  translationForm: FormGroup = new FormGroup({});
  isLoggedIn?: Observable<boolean>;
  isLoggedInValue: boolean = false;
  private subscription!: Subscription;
  private previousChoice!: TranslationFormInput | null;

  constructor(
    private translationService: TranslationService,
    private formBuilder: FormBuilder,
    private loaderService: LoaderService,
    private dialog: MatDialog,
    private cacheService: CacheService,
    private authService: AuthService
  ) {}

  ngOnInit(): void {
    this.isLoggedIn = this.authService.isLoggedIn;
    this.subscription = this.isLoggedIn.subscribe((value: boolean) => this.isLoggedInValue = value);
    this.previousChoice = this.cacheService.getTranslationChoice();
    this.translationForm = this.formBuilder.group({
      query: [this.previousChoice?.query || '', Validators.required],
      langCode: [this.previousChoice?.langCode || '', Validators.required],
      countryCode: [this.previousChoice?.countryCode || '', Validators.required],
    });
    this.autoSelectOneOrMoreMatchingCountries();
    this.loaderService.isLoading.subscribe((loading: boolean) => this.isLoading = loading);
    this.handleCachedTranslatedPages();
  }

  ngOnDestroy(): void {
    this.subscription.unsubscribe();
  }

  toggleTooltip(tooltip: MatTooltip): void {
    if (!this.isLoggedInValue) {
      tooltip.toggle();
    }
  }

  handleSubmitSearchData(): void {
    if (!this.translationForm.valid) return;
    const choice: TranslationFormInput = this.translationForm.value;
    if (this.checkForDuplicateChoice(choice)) return;
    this.processTranslationRequest(choice);
  }

  private checkForDuplicateChoice(currentChoice: TranslationFormInput): boolean {
    if (this.isDuplicateChoice(currentChoice)) {
      const dialogMessage: string = this.buildDialogMessage(this.previousChoice, currentChoice);
      this.openDialog(dialogMessage);
      return true;
    }
    return false;
  }

  private isDuplicateChoice(current: TranslationFormInput): null | boolean {
    return this.previousChoice && Object.keys(current).every((key: string) =>
      this.previousChoice?.[key as keyof TranslationFormInput]?.trim() ===
      current[key as keyof TranslationFormInput].trim());
  }

  private buildDialogMessage(previousChoice: TranslationFormInput | null, currentChoice: TranslationFormInput): string {
    const currentLanguage: string = this.getCurrentLanguageChoice(currentChoice);
    const currentCountry: string = this.getCurrentCountryChoice(currentChoice);
    const lowQuote = '\u201E';
    return `Rezultaty wybranych przez Ciebie opcji
        ${lowQuote}${previousChoice?.query}", ${lowQuote}${currentLanguage}", ${lowQuote}${currentCountry}"
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
    this.updateCachedChoice(choice);
    this.updateCachedTranslatedPages(resp.data);
    if (resp.warning) {
      this.openDialog(resp.warning);
    }
  }

  private updateCachedTranslatedPages(pages: TranslatedPage[]): void {
    if (pages) {
      this.translatedPages = pages.filter((page: TranslatedPage) => page != null);
      this.cacheService.setTranslatedPages(this.translatedPages);
    }
  }

  private updateCachedChoice(choice: TranslationFormInput): void {
    this.cacheService.setTranslationChoice(choice);
    this.previousChoice = choice;
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
