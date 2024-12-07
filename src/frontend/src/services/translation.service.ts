// angular
import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { FormGroup } from '@angular/forms';

// rxjs
import { Observable } from 'rxjs';

// models
import { TranslatedPage } from '../models/translated-page';
import { SearchData } from '../models/search-data';
import { Response } from '../models/response';

import { environment } from '../environments/environment';


@Injectable({
  providedIn: 'root'
})
export class TranslationService {

  constructor(private http: HttpClient) { }

  getTranslatedPages(form: FormGroup): Observable<Response<TranslatedPage[]>> {
    return this.http.get<Response<TranslatedPage[]>>(this.buildUrl(form));
  }

  private buildUrl(form: FormGroup): string {
    const formData: SearchData = form.value;
    const query: string = `query=${formData.query}`;
    const langCode: string = `langCode=${formData.langCode}`;
    const countryCode: string = `countryCode=${formData.countryCode}`;
    return `${environment.baseUrl}/translate?${query}&${langCode}&${countryCode}`;
  }
}
