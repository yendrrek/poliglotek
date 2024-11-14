import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';
import { environment } from '../environments/environment';
import { FormGroup } from '@angular/forms';
import { TranslatedPage } from '../models/translated-page';
import { SearchData } from '../models/search-data';

@Injectable({
  providedIn: 'root'
})
export class TranslationService {

  constructor(private http: HttpClient) { }

  getTranslatedPages(form: FormGroup): Observable<TranslatedPage[]> {
    return this.http.get<TranslatedPage[]>(this.buildUrl(form));
  }

  private buildUrl(form: FormGroup): string {
    const formData: SearchData = form.value;
    const query: string = `query=${formData.query}`;
    const langCode: string = `langCode=${formData.langCode}`;
    const countryCode: string = `countryCode=${formData.countryCode}`;
    return `${environment.baseUrl}/translate?${query}&${langCode}&${countryCode}`;
  }
}
