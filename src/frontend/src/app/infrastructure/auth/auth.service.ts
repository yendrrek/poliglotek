import { Injectable } from '@angular/core';
import { environment } from '../../../environments/environment';
import { BehaviorSubject, catchError, map, Observable, of, tap } from 'rxjs';
import { HttpClient } from '@angular/common/http';
import { AuthResponse } from './auth-response';
import { AuthRequest } from './auth-request';
import { AuthStorageService } from './auth-storage.service';
import { UserIdentity } from '../../domain/auth/user-identity';
import { DecodedGoogleCredential } from './decoded-google-credential';
import { AuthPortOut } from '../../application/auth/auth-port-out';

@Injectable({
  providedIn: 'root'
})
export class AuthService implements AuthPortOut {

  private DEFAULT_USER_IDENTITY: UserIdentity = new UserIdentity(
    '', '', false, 0, '');
  private API_URL: string = environment.apiUrl;
  private isLoggedInSubject: BehaviorSubject<boolean> = new BehaviorSubject<boolean>(false);
  isLoggedIn: Observable<boolean> = this.isLoggedInSubject.asObservable();

  constructor(private http: HttpClient,
              private authStorageService: AuthStorageService) {
  }

  authenticate(googleCredential: string): Observable<UserIdentity> {
    if (!googleCredential) {
      return of(this.DEFAULT_USER_IDENTITY);
    }
    const authRequest: AuthRequest = { googleIdToken: googleCredential };

    return this.http.post<AuthResponse>(`${this.API_URL}/auth/login`, authRequest).pipe(
      tap((resp: AuthResponse) => {
        this.authStorageService.saveToken(resp.customToken); // storing custom jcw in browser session
      }),
      map(() => {
        const dcg: DecodedGoogleCredential = this.decodeJwtResponse(googleCredential);
        const isEmailVerified: boolean = dcg.email_verified;
        this.isLoggedInSubject.next(isEmailVerified);
        // todo: store user info in the database (based on google auth response)
        return new UserIdentity(dcg.aud, dcg.email, isEmailVerified, dcg.exp, dcg.name);
      }),
      catchError(err => {
        console.error('Authentication failed', err);
        return of(this.DEFAULT_USER_IDENTITY);
      })
    );
  }

  logout(): Observable<void> {
    const token: string | null = this.authStorageService.retrieveToken();
    if (!token) {
      this.authStorageService.removeToken();
      return of(undefined);
    }
    return this.http.post<void>(`${this.API_URL}/auth/logout`, {}, {
      headers: { Authorization: `Bearer ${token}` }
    }).pipe(
      tap(() => this.authStorageService.removeToken()),
      catchError(error => {
        console.error('Server logout failed:', error);
        // Still remove token locally even if the server call fails
        this.authStorageService.removeToken();
        return of(undefined);
      })
    );
  }

  private decodeJwtResponse(jwt: string): DecodedGoogleCredential {
    let base64Url: string = jwt.split('.')[1];
    let base64: string = base64Url.replace(/-/g, '+').replace(/_/g, '/');
    let jsonPayload: string = decodeURIComponent(atob(base64).split('').map((c: string): string => {
      return '%' + ('00' + c.charCodeAt(0).toString(16)).slice(-2);
    }).join(''));
    return JSON.parse(jsonPayload);
  }
}
