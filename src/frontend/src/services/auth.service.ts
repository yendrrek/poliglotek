import { ElementRef, Injectable, ViewChild } from '@angular/core';
import { environment } from '../environments/environment';
import { BehaviorSubject, Observable, tap } from 'rxjs';
import { HttpClient } from '@angular/common/http';
import { GoogleSigninResponse } from '../models/google-signin-response';
import { DecodedCredential } from '../models/decoded-credential';

declare const google: any;

@Injectable({
  providedIn: 'root'
})
export class AuthService {

  @ViewChild('googleSignInButton') googleButton!: ElementRef;

  private API_URL: string = environment.apiUrl;
  private isLoggedInSubject: BehaviorSubject<boolean> = new BehaviorSubject<boolean>(false);

  constructor(private http: HttpClient) {
    this.checkUserLoggedIn();
  }

  logoutThenClearJWT(): void {
    const token: string | null = this.getJWT();
    if (token) {
      this.http.post(`${this.API_URL}/logout`, {}, {
        headers: { Authorization: `Bearer ${token}` }
      }).subscribe({
        next: () => console.log('Logged out on server'),
        error: err => console.error('Logout error', err)
      });
    }
    localStorage.removeItem('token');
    this.isLoggedInSubject.next(false);
    google.accounts.id.disableAutoSelect();
  }

  isLoggedIn(): boolean {
    return this.isLoggedInSubject.value;
  }

  handleCredentialResponse(resp: GoogleSigninResponse): void {
    const googleIdToken: string = resp.credential;
    this.loginWithGoogleThenStoreCustomJWT(googleIdToken).subscribe({
      next: () => this.isLoggedInSubject.next(true),
      error: err => console.error('Login failed:', err),
    });
  }

  private checkUserLoggedIn(): void {
    const token: string | null = this.getJWT();
    if (token) {
      this.isLoggedInSubject.next(true);
    }
  }

  private getJWT(): string | null {
    return localStorage.getItem('token');
  }

  private loginWithGoogleThenStoreCustomJWT(googleIdToken: string): Observable<any> {
    return this.http.post(`${this.API_URL}/login`, { googleIdToken: googleIdToken }).pipe(
      tap((res: any) => localStorage.setItem('token', res.customToken))
    );
  }

  private decodeJwtResponse(jwt: string): DecodedCredential {
    let base64Url: string = jwt.split('.')[1];
    let base64: string = base64Url.replace(/-/g, '+').replace(/_/g, '/');
    let jsonPayload: string = decodeURIComponent(atob(base64).split('').map((c: string): string => {
      return '%' + ('00' + c.charCodeAt(0).toString(16)).slice(-2);
    }).join(''));
    return JSON.parse(jsonPayload);
  }
}
