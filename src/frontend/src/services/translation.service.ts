import { environment } from '../environments/environment';
import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';
import { TranslatedPage } from '../models/translated-page';
import { TranslationFormInput } from '../models/translation-form-input';
import { Response } from '../models/response';

@Injectable({
  providedIn: 'root'
})
export class TranslationService {

  constructor(private http: HttpClient) { }

  getTranslatedPages(translationRequest: TranslationFormInput): Observable<Response<TranslatedPage[]>> {
    const url: string = `${environment.baseUrl}/api/translate?` +
      `query=${translationRequest.query}` +
      `&langCode=${translationRequest.langCode}` +
      `&countryCode=${translationRequest.countryCode}`;
    return this.http.get<Response<TranslatedPage[]>>(url);
  }
}
