import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';
import { TranslatedPage } from '../models/translated-page';
import { environment } from '../environments/environment';

@Injectable({
  providedIn: 'root'
})
export class TranslationService {

  constructor(private http: HttpClient) { }

  getTranslatedPages(query: string, langCode: string, countryCode: string): Observable<TranslatedPage[]> {
    const url: string = `${environment.baseUrl}/translate?query=${query}&langCode=${langCode}&countryCode=${countryCode}`;
    return this.http.get<TranslatedPage[]>(url);
  }
}
