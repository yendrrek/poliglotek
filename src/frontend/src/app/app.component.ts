// angular
import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, FormsModule, ReactiveFormsModule } from '@angular/forms';
import { HttpErrorResponse } from '@angular/common/http';

// angular material
import { MatTab, MatTabGroup } from '@angular/material/tabs';
import { MatFormField, MatLabel, MatSuffix } from '@angular/material/form-field';
import { MatOption, MatSelect } from '@angular/material/select';
import { MatInput } from '@angular/material/input';
import { MatIcon } from '@angular/material/icon';
import { MatButton, MatIconButton } from '@angular/material/button';
import { MatProgressSpinnerModule } from '@angular/material/progress-spinner';
import { MatDialog, MatDialogConfig } from '@angular/material/dialog';
import { DialogComponent } from '../containers/dialog/dialog.component';

// rxjs
import { Observable, throwError } from 'rxjs';

// models
import { Language } from '../models/language';
import { Country } from '../models/country';
import { TranslatedPage } from '../models/translated-page';
import { Response } from '../models/response';
import { LanguageValue } from '../types/language-value';

// services
import { TranslationService } from '../services/translation.service';
import { LoaderService } from '../services/loader.service';

// constants
import { LANGUAGES } from '../constants/languages';
import { COUNTRIES } from '../constants/countries';
import { LANG_COUNTRY_MATCH } from '../constants/lang-country-match';
import { ONE_COUNTRY_FROM_MANY } from '../constants/one-country-from-many';
import { NgOptimizedImage } from '@angular/common';

@Component({
  selector: 'root',
  imports: [MatTab, MatTabGroup, MatFormField, MatLabel,
    MatSelect, MatOption, MatInput, MatSuffix, MatIcon, MatIconButton,
    FormsModule, MatButton, MatProgressSpinnerModule, ReactiveFormsModule, NgOptimizedImage],
  templateUrl: './app.component.html',
  styleUrl: './app.component.scss'
})
export class AppComponent implements OnInit {
  title: string = 'frontend';
  languages: Language[] = LANGUAGES.sort((a: Language, b: Language) => a.languageViewValue.localeCompare(b.languageViewValue));
  countries: Country[] = Object.values(COUNTRIES).sort((a: Country, b: Country) => a.countryViewValue.localeCompare(b.countryViewValue));
  dynamicCountries: Country[] = [];
  translatedPages: TranslatedPage[] = [];
  form: FormGroup;
  isLoading: boolean = false;

  constructor(
    private translationService: TranslationService,
    private formBuilder: FormBuilder,
    private loaderService: LoaderService,
    private dialog: MatDialog,
  ) {
    this.form = this.formBuilder.group({
      query: [''],
      langCode: [''],
      countryCode: [''],
    });
  }

  ngOnInit(): void {
    this.autoSelectOneOrMoreMatchingCountries();
    this.loaderService.isLoading.subscribe((loading: boolean) => this.isLoading = loading);
  }

  handleSubmitSearchData(): void {
    if (this.form.valid) {
      this.translationService.getTranslatedPages(this.form).subscribe({
        next: (resp: Response<TranslatedPage[]>): void => {
          if (!resp.success) {
            this.openDialog(resp.error);
            return;
          }
          this.translatedPages = resp.data.filter(item => item != null);
          if (resp.warning) {
            this.openDialog(resp.warning);
          }
        },
        error: (error: HttpErrorResponse): Observable<never> => {
          if (error.error instanceof  ErrorEvent) {
            console.warn('Client-side error', error.message);
          } else {
            console.warn('Server-side error', error.status);
          }
          return throwError((): Error => new Error(error.message));
        }
      });
    }
  }

  private autoSelectOneOrMoreMatchingCountries(): void {
    this.form.get('langCode')?.valueChanges.subscribe((selectedValue: LanguageValue) => {
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
    this.form.get('countryCode')?.setValue(oneMatchingCountry?.countryValue);
  }

  private autoSelectMoreMatchingCountries(moreMatchingCountries: Country[]): void {
    this.dynamicCountries = moreMatchingCountries.sort((a: Country, b: Country) => a.countryViewValue.localeCompare(b.countryViewValue));
    this.dynamicCountries.forEach((dynamicCountry: Country) => {
      this.countries = this.countries.filter((country: Country) => country.countryValue !== dynamicCountry.countryValue);
    });
  }

  private openDialog(message: string): void {
    const dialogConfig: MatDialogConfig = {
      data: {
        error: message }
    };
    this.dialog.open(DialogComponent, dialogConfig);
  }
}
