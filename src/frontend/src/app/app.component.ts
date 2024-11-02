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
  languages: Language[] = LANGUAGES;
  countries: Country[] = COUNTRIES;
  translatedPages: string[] = [];

  constructor(private translationService: TranslationService) {}

  handleSubmitSearchData(form: NgForm) {
    if (form.valid) {
      this.translationService.getTranslatedPages(form)
      .subscribe((translatedPages: string[]): string[] => this.translatedPages = translatedPages);
    }
  }
}
