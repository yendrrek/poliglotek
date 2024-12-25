import { Component, OnInit } from '@angular/core';
import { RouterOutlet } from '@angular/router';
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
import { NavbarComponent } from '../../components/navbar/navbar.component';
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

@Component({
  selector: 'home',
  imports: [MatTab, MatTabGroup, MatFormField, MatLabel,
    MatSelect, MatOption, MatInput, MatSuffix, MatIcon, MatIconButton,
    FormsModule, MatButton, MatProgressSpinnerModule, ReactiveFormsModule, NgOptimizedImage, NavbarComponent, RouterOutlet],
  templateUrl: './translation.component.html',
  styleUrl: './translation.component.scss'
})
export class TranslationComponent implements OnInit {
  title: string = 'frontend';
  languages: Language[] = LANGUAGES.sort((a: Language, b: Language) => a.languageViewValue.localeCompare(b.languageViewValue));
  countries: Country[] = Object.values(COUNTRIES).sort((a: Country, b: Country) => a.countryViewValue.localeCompare(b.countryViewValue));
  dynamicCountries: Country[] = [];
  translatedPages: TranslatedPage[] = [];
  searchForm: FormGroup = new FormGroup({});
  isLoading: boolean = false;

  constructor(
    private translationService: TranslationService,
    private formBuilder: FormBuilder,
    private loaderService: LoaderService,
    private dialog: MatDialog,
  ) {
  }

  ngOnInit(): void {
    this.searchForm = this.formBuilder.group({
      query: ['', Validators.required],
      langCode: ['', Validators.required],
      countryCode: ['', Validators.required],
    });
    this.autoSelectOneOrMoreMatchingCountries();
    this.loaderService.isLoading.subscribe((loading: boolean) => this.isLoading = loading);
  }

  handleSubmitSearchData(): void {
    if (this.searchForm.valid) {
      this.translationService.getTranslatedPages(this.searchForm).subscribe({
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
          return handleHttpError(error);
        }
      });
    }
  }

  private autoSelectOneOrMoreMatchingCountries(): void {
    this.searchForm.get('langCode')?.valueChanges.subscribe((selectedValue: LanguageValue) => {
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
    this.searchForm.get('countryCode')?.setValue(oneMatchingCountry?.countryValue);
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
    this.dialog.open(DialogNotificationComponent, dialogConfig);
  }
}
