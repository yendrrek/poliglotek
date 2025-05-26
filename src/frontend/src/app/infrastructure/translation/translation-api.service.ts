import { environment } from '../../../environments/environment';
import { Injectable } from '@angular/core';
import { HttpClient, HttpErrorResponse, HttpHeaders } from '@angular/common/http';
import { catchError, Observable, throwError } from 'rxjs';
import { TranslationRequest } from './translation-request';
import { TranslationResponse } from './translation-response';
import { AuthStorageService } from '../auth/auth-storage.service';

@Injectable({
  providedIn: 'root'
})
export class TranslationApiService {

  constructor(
    private http: HttpClient,
    private authStorageService: AuthStorageService) {}

  translate(choice: TranslationRequest): Observable<TranslationResponse> {
    const token: string | null = this.authStorageService.retrieveToken();
    const headers: HttpHeaders = new HttpHeaders().set('Authorization', `Bearer ${token}`);
    const url: string = `${environment.baseUrl}/api/translate?` +
      `query=${choice.query}` +
      `&langCode=${choice.langCode}` +
      `&countryCode=${choice.ctryCode}`;
    return this.http.get<TranslationResponse>(url, { headers }).pipe(
      catchError(this.handleError)
    );
  }

  private handleError(err: HttpErrorResponse): Observable<never> {
    console.error('An error occurred', err);
    return throwError(() => err);
  }
}

// TODO: exclude google play from the custom search engine
// https://play.google.com/store/apps/details?id=com.mad.duck_life_treasure_hunt&hl=ar
