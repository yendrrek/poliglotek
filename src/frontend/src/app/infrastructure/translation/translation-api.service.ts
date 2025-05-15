import { environment } from '../../../environments/environment';
import { Injectable } from '@angular/core';
import { HttpClient, HttpErrorResponse } from '@angular/common/http';
import { catchError, Observable, throwError } from 'rxjs';
import { TranslationRequest } from './translation-request';
import { TranslationResponse } from './translation-response';

@Injectable({
  providedIn: 'root'
})
export class TranslationApiService {

  constructor(private http: HttpClient) {}

  translate(choice: TranslationRequest): Observable<TranslationResponse> {
    return this.http.post<TranslationResponse>(`${environment.baseUrl}/api/translate`, choice).pipe(
      catchError(this.handleError)
    );
  }

  private handleError(err: HttpErrorResponse): Observable<never> {
    console.error('An error occurred', err);
    return throwError(() => err);
  }
}
