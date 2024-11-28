import { Component, OnInit } from '@angular/core';
import { MatTab, MatTabGroup } from '@angular/material/tabs';
import { MatFormField, MatLabel, MatSuffix } from '@angular/material/form-field';
import { MatOption, MatSelect } from '@angular/material/select';
import { MatInput } from '@angular/material/input';
import { MatIcon } from '@angular/material/icon';
import { MatButton, MatIconButton } from '@angular/material/button';
import { FormBuilder, FormGroup, FormsModule, ReactiveFormsModule } from '@angular/forms';
import { Language } from '../models/language';
import { LANGUAGES } from '../constants/languages';
import { Country } from '../models/country';
import { COUNTRIES } from '../constants/countries';
import { TranslationService } from '../services/translation.service';
import { MatProgressSpinnerModule } from '@angular/material/progress-spinner';
import { HttpErrorResponse } from '@angular/common/http';
import { Observable, throwError } from 'rxjs';
import { TranslatedPage } from '../models/translated-page';
import { LANG_COUNTRY_MATCH } from '../constants/lang-country-match';
import { LanguageValue } from '../types/language-value';
import { LoaderService } from '../services/loader.service';

@Component({
  selector: 'app-root',
  imports: [MatTab, MatTabGroup, MatFormField, MatLabel,
    MatSelect, MatOption, MatInput, MatSuffix, MatIcon, MatIconButton,
    FormsModule, MatButton, MatProgressSpinnerModule, ReactiveFormsModule],
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
  isLoading: boolean =false;

  constructor(
    private translationService: TranslationService,
    private formBuilder: FormBuilder,
    private loaderService: LoaderService,
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
        next: (translatedPages: TranslatedPage[]): void => {
          if (this.isNothingToTranslate(translatedPages)) {
            this.translatedPages = [];
            alert("Wygląda na to, że ta kombinacja nie daje żadnych rezultatów.");
            return;
          }
          this.translatedPages = translatedPages;
          console.log(this.translatedPages);
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

  private isNothingToTranslate(translatedPages: TranslatedPage[]): boolean {
    return translatedPages.length === 1 &&
      translatedPages.every((page: TranslatedPage)=> Object.values(page).every((value: string) => !value));
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
    });
  }

  private autoSelectOneCountry(oneMatchingCountry: Country): void {
    this.form.get('countryCode')?.setValue(oneMatchingCountry.countryValue);
  }

  private autoSelectMoreMatchingCountries(moreMatchingCountries: Country[]): void {
    this.dynamicCountries = moreMatchingCountries.sort((a: Country, b: Country) => a.countryViewValue.localeCompare(b.countryViewValue));
    this.dynamicCountries.forEach((dynamicCountry: Country) => {
      this.countries = this.countries.filter((country: Country) => country.countryValue !== dynamicCountry.countryValue);
    });
  }
}
