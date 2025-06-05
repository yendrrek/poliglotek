import { Injectable } from '@angular/core';
import { environment } from '../../../environments/environment';
import { catchError, map, Observable, throwError } from 'rxjs';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { AuthResponse } from './models/auth-response.model';
import { AuthApiPort } from '../../application/auth/auth-api-port';

@Injectable({
  providedIn: 'root'
})
export class AuthApiAdapter implements AuthApiPort {

  private readonly apiUrl = `${environment.apiUrl}/auth`;

  constructor(private http: HttpClient) {}

  login(googleIdToken: string): Observable<AuthResponse> {
    if (!googleIdToken) {
      return throwError((): Error => new Error('Google ID token is required'));
    }
    const request = { googleIdToken: googleIdToken };
    return this.http.post<AuthResponse>(`${this.apiUrl}/login`, request).pipe(

      map((response: AuthResponse) => ({
        customToken: response.customToken,
        expiresAt: response.expiresIn,
        // todo: store user info in the database (based on google auth response)
      })),
      catchError(err => {
        console.error('AuthAPI login failed', err);
        return throwError((): Error => new Error(err.error?.message || 'Authentication failed'));
      })
    );
  }

  logout(authToken: string): Observable<void> {
    if (!authToken) {
      return throwError((): Error => new Error('No auth token provided'));
    }
    const headers = new HttpHeaders({'Authorization': `Bearer ${authToken}`});
    return this.http.post<void>(`${this.apiUrl}/logout`, {}, {headers}).pipe(
      catchError(err => {
        console.error('Auth API logout failed', err);
        return throwError((): Error => new Error(err.error?.message || 'Logout failed'));
      })
    );
  }
}
