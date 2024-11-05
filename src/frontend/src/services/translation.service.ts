import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';
import { environment } from '../environments/environment';
import { NgForm } from '@angular/forms';
import { TranslatedPage } from '../models/translated-page';

@Injectable({
  providedIn: 'root'
})
export class TranslationService {

  constructor(private http: HttpClient) { }

  getTranslatedPages(form: NgForm): Observable<TranslatedPage[]> {
    return this.http.get<TranslatedPage[]>(this.buildUrl(form));
  }

  private buildUrl(form: NgForm): string {
    const query: string = `query=${form.value.query}`;
    const langCode: string = `langCode=${form.value.langCode}`;
    const countryCode: string = `countryCode=${form.value.countryCode}`;
    return `${environment.baseUrl}/translate?${query}&${langCode}&${countryCode}`;
  }
}
