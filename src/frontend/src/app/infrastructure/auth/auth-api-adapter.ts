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

  // private API_URL: string = environment.apiUrl;
  // private isLoggedInSubject: BehaviorSubject<boolean> = new BehaviorSubject<boolean>(false);

  constructor(private http: HttpClient) {}

  login(googleIdToken: string): Observable<AuthResponse> {
    if (!googleIdToken) {
      return throwError((): Error => new Error('Google ID token is required'));
    }
    const request = { googleCredential: googleIdToken };
    // const authRequest: AuthRequestModel = { googleIdToken: googleCredential };
    return this.http.post<AuthResponse>(`${this.apiUrl}/login`, request).pipe(
      // tap((resp: AuthResponseModel) => {
      //   this.authStorageService.saveToken(resp.customToken);
      // }),
      map((response: AuthResponse) => ({
        customToken: response.customToken,
        expiresAt: response.expiresIn,
        // const dcg: DecodedGoogleCredential = this.decodeJwtResponse(googleIdToken);
        // const isEmailVerified: boolean = dcg.email_verified;
        // this.isLoggedInSubject.next(isEmailVerified);
        // todo: store user info in the database (based on google auth response)
        // return new UserIdentity(
        //   new GoogleClientId(dcg.aud),
        //   new Email(dcg.email),
        //   isEmailVerified,
        //   new Date(dcg.exp),
        //   dcg.name
        // );
      })),
      catchError(err => {
        console.error('AuthAPI login failed', err);
        // return of(UserIdentity.createAnonymous());
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
        return throwError(() => new Error(err.error?.message || 'Logout failed'));
      })
    );


    // const token: string | null = this.authStorageService.retrieveToken();
    // if (!token) {
    //   this.authStorageService.removeToken();
    //   return of(undefined);
    // }
    // return this.http.post<void>(`${this.API_URL}/auth/logout`, {}, {
    //   headers: { Authorization: `Bearer ${token}` }
    // }).pipe(
    //   tap(() => this.authStorageService.removeToken()),
    //   catchError(err => {
    //     console.error('Server logout failed:', err);
    //     this.authStorageService.removeToken();
    //     return of(undefined);
    //   })
    // );
  }

  // private decodeJwtResponse(jwt: string): DecodedGoogleCredential {
  //   let base64Url: string = jwt.split('.')[1];
  //   let base64: string = base64Url.replace(/-/g, '+').replace(/_/g, '/');
  //   let jsonPayload: string = decodeURIComponent(atob(base64).split('').map((c: string): string => {
  //     return '%' + ('00' + c.charCodeAt(0).toString(16)).slice(-2);
  //   }).join(''));
  //   return JSON.parse(jsonPayload);
  // }
}
