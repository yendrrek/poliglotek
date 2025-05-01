import { environment } from '../environments/environment';
import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Observable } from 'rxjs';
import { TranslationFormInput } from '../models/translation-form-input';
import { TranslationResponse } from '../models/translation-response';

@Injectable({
  providedIn: 'root'
})
export class TranslationService {

  constructor(private http: HttpClient) { }

  getTranslatedPages(translationRequest: TranslationFormInput): Observable<TranslationResponse> {
    const token: string | null = localStorage.getItem('token');
    const headers: HttpHeaders = new HttpHeaders().set('Authorization', `Bearer ${token}`);
    const url: string = `${environment.baseUrl}/api/translate?` +
      `query=${translationRequest.query}` +
      `&langCode=${translationRequest.langCode}` +
      `&countryCode=${translationRequest.countryCode}`;
    return this.http.get<TranslationResponse>(url, { headers });
  }
}
