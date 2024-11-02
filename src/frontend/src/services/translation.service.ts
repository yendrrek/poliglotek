import { Injectable } from '@angular/core';
import { HttpClient, HttpErrorResponse } from '@angular/common/http';
import { Observable, throwError } from 'rxjs';
import { environment } from '../environments/environment';
import { NgForm } from '@angular/forms';

@Injectable({
  providedIn: 'root'
})
export class TranslationService {

  constructor(private http: HttpClient) {}

  getTranslatedPages(form: NgForm): Observable<string[]> {
    return this.http.get<string[]>(this.buildUrl(form));
  }

  private buildUrl(form: NgForm): string {
    const query: string = `query=${form.value.query}`;
    const langCode: string = `langCode=${form.value.langCode}`;
    const countryCode: string = `countryCode=${form.value.countryCode}`;
    return `${environment.baseUrl}/translate?${query}&${langCode}&${countryCode}`;
}

  private handleError(error: HttpErrorResponse) {
    if (error.error instanceof ErrorEvent) {
      console.warn('Client-side error', error.message);
    } else {
      console.warn('Server-side error', error.status);
    }
    return throwError(() => new Error(error.message));
  }
}
