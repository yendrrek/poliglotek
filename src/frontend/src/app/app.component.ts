import { Component } from '@angular/core';
import { RouterOutlet } from '@angular/router';
import { MatTab, MatTabGroup } from '@angular/material/tabs';
import { MatFormField, MatLabel, MatSuffix } from '@angular/material/form-field';
import { MatOption, MatSelect } from '@angular/material/select';
import { MatInput } from '@angular/material/input';
import { MatIcon } from '@angular/material/icon';
import { MatButton, MatIconButton } from '@angular/material/button';
import { FormsModule, NgForm } from '@angular/forms';
import { Language } from '../models/language';
import { LANGUAGES } from '../constants/languages';
import { Country } from '../models/country';
import { COUNTRIES } from '../constants/countries';
import { TranslationService } from '../services/translation.service';
import { MatProgressSpinnerModule } from '@angular/material/progress-spinner';
import { HTTP_INTERCEPTORS, HttpErrorResponse } from '@angular/common/http';
import { spinnerInterceptor } from '../interceptors/spinner.interceptor';
import { LoadingService } from '../services/loading.service';
import { Observable, throwError } from 'rxjs';
import { AsyncPipe } from '@angular/common';
import { TranslatedPage } from '../models/translated-page';

@Component({
  selector: 'app-root',
  standalone: true,
  imports: [RouterOutlet, MatTab, MatTabGroup, MatFormField, MatLabel,
    MatSelect, MatOption, MatInput, MatSuffix, MatIcon, MatIconButton,
    FormsModule, MatButton],
  templateUrl: './app.component.html',
  styleUrl: './app.component.scss'
})
export class AppComponent {
  title: string = 'frontend';
  query: string = '';
  languages: Language[] = LANGUAGES.sort((a: Language, b: Language) => a.languageViewValue.localeCompare(b.languageViewValue));
  countries: Country[] = COUNTRIES.sort((a: Country, b: Country) => a.countryViewValue.localeCompare(b.countryViewValue));
  translatedPages: TranslatedPage[] = [];
  loading: boolean = false;
  progress: Observable<number>;

  constructor(private translationService: TranslationService) {}

  handleSubmitSearchData(form: NgForm): void {
    if (form.valid) {
      this.translationService.getTranslatedPages(form).subscribe({
        next: (translatedPages: TranslatedPage[]): void => {
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
}
