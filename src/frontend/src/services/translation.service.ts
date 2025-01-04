import { environment } from '../environments/environment';
import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { FormGroup } from '@angular/forms';
import { Observable } from 'rxjs';
import { TranslatedPage } from '../models/translated-page';
import { SearchData } from '../models/search-data';
import { Response } from '../models/response';

@Injectable({
  providedIn: 'root'
})
export class TranslationService {

  constructor(private http: HttpClient) { }

  getTranslatedPages(form: FormGroup): Observable<Response<TranslatedPage[]>> {
    const url: string = this.buildUrl(form);
    return this.http.get<Response<TranslatedPage[]>>(url);
  }

  private buildUrl(form: FormGroup): string {
    const formData: SearchData = form.value;
    const query: string = `query=${formData.query}`;
    const langCode: string = `langCode=${formData.langCode}`;
    const countryCode: string = `countryCode=${formData.countryCode}`;
    return `${environment.baseUrl}/api/translate?${query}&${langCode}&${countryCode}`;
  }
}
