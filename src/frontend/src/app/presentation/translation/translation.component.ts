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
import { Language } from '../../domain/translation/models/language';
import { Country } from '../../domain/translation/models/country';
import { Translation } from '../../domain/translation/translation';
import { LanguageValue } from '../../domain/translation/types/language-value';
import { TranslationRequest } from '../../infrastructure/translation/translation-request';
import { TranslationResponsiveDirective } from './translation-responsive.directive';
import { MatTooltip } from '@angular/material/tooltip';
import { TranslationStateService } from './translation-state.service';
import { CountryValue } from '../../domain/translation/types/country-value';
import { AuthFacadeService } from '../../application/auth/auth-facade.service';
import { TranslationDialogMessage } from '../../application/translation/translation-dialog-message';

@Component({
  selector: 'home',
  imports: [MatTab, MatTabGroup, MatFormField, MatLabel,
    MatSelect, MatOption, MatInput, MatSuffix, MatIcon, MatIconButton,
    FormsModule, MatButton, MatProgressSpinnerModule, ReactiveFormsModule, NgOptimizedImage,
    TranslationResponsiveDirective, AsyncPipe, MatTooltip],
  template: `
    @if (isLoading | async; as isLoading) {
      @if (isLoading) {
        <div class="spinner-overlay">
          <mat-spinner mode="indeterminate"></mat-spinner>
        </div>
      }
    }

    <form class="search-form-container" [formGroup]="translationForm" formResponsive>
      <mat-form-field class="search-form--query-input-width" hideRequiredMarker floatLabel="always" formFieldResponsive>
        <mat-label formFieldResponsive>Szukana fraza po polsku</mat-label>
        <input required matInput type="text" formControlName="query">
        @if (translationForm.get('query')?.value) {
          <button matSuffix mat-icon-button aria-label="Clear"
                  (click)="clearQueryField()">
            <mat-icon>close</mat-icon>
          </button>
        }
      </mat-form-field>

      <mat-form-field class="select-distance select-width" hideRequiredMarker floatLabel="always" formFieldResponsive>
        <mat-label formFieldResponsive>Tłumacz frazę na</mat-label>
        <mat-select required formControlName="langCode">
          @if (languages | async; as languages) {
            @for (language of languages; track language.langValue) {
              <mat-option [value]="language.langValue">{{ language.langViewValue }}</mat-option>
            }
          }
        </mat-select>
      </mat-form-field>

      <mat-form-field class="select-distance select-width" hideRequiredMarker floatLabel="always" formFieldResponsive>
        <mat-label formFieldResponsive>Kraj wyników</mat-label>
        <mat-select required formControlName="countryCode">
          @if (autoSelectedCountries | async; as autoSelectedCountries) {
            @if (autoSelectedCountries.length > 0) {
              @for (ctry of autoSelectedCountries; track ctry.ctryValue) {
                <mat-option class="dynamic-countries-border"
                            [class.first-country-item]="$first"
                            [class.last-country-item]="$last"
                            [value]="ctry.ctryValue">{{ ctry.ctryViewValue }}
                </mat-option>
              }
            }
          }
          @if (nonSelectedCountries | async; as nonSelectedCountries) {
            @if (nonSelectedCountries.length > 0) {
              @for (ctry of nonSelectedCountries; track ctry.ctryValue) {
                <mat-option [value]="ctry.ctryValue">{{ ctry.ctryViewValue }}</mat-option>
              }
            } @else {
              @if (countries | async; as countries) {
                @for (ctry of countries; track ctry.ctryValue) {
                  <mat-option [value]="ctry.ctryValue">{{ ctry.ctryViewValue }}</mat-option>
                }
              }
            }
          }
        </mat-select>
      </mat-form-field>

      <button [disabled]="!(isLoggedIn | async)"
              class="search-button"
              disabledInteractive
              mat-raised-button
              [matTooltip]="!(isLoggedIn | async) ? noAccessMessage : ''"
              #tooltip="matTooltip"
              (touchstart)="toggleTooltip(tooltip)"
              searchButtonResponsive (click)="handleTranslation()">Znajdź i przetłumacz
      </button>
    </form>

    <div class="header-container">
      <span>Tłumacznie znalezionych stron na polski:</span>
    </div>

    <mat-tab-group class="tabs-container">
      @if (translations | async; as translations) {
        @for (translation of translations; let i = $index; track translation.id) {
          <mat-tab [label]="'Strona ' + (i + 1)">
            <div class="translatedPageContainer" [innerHTML]="translation.page.body"></div>
            <a [href]="translation.url" target="_blank" class="source-url">Źródło</a>
            <img class="attribution-logo" ngSrc="img/google-attribution.svg" alt="Google attribution image"
                 height="16" width="122">
          </mat-tab>
        }
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
