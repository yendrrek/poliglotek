import { Injectable } from '@angular/core';
import { environment } from '../../../environments/environment';
import { BehaviorSubject, Observable, tap } from 'rxjs';
import { HttpClient } from '@angular/common/http';
import { GoogleSigninResponse } from '../../infrastructure/auth/google-signin-response';
import { AuthResponse } from '../../infrastructure/auth/auth-response';
import { AuthRequest } from '../../infrastructure/auth/auth-request';
import { AuthStorageService } from '../../infrastructure/auth/auth-storage.service';

declare const google: any;

@Injectable({
  providedIn: 'root'
})
export class AuthFacadeService {

  private API_URL: string = environment.apiUrl;
  private isLoggedInSubject: BehaviorSubject<boolean> = new BehaviorSubject<boolean>(false);
  isLoggedIn: Observable<boolean> = this.isLoggedInSubject.asObservable();

  constructor(private http: HttpClient,
              private authStorageService: AuthStorageService) {
    this.checkUserLoggedIn();
  }

  handleCredentialResponse(resp: GoogleSigninResponse): void {
    const googleIdToken: string = resp.credential;
    this.loginWithGoogleThenStoreCustomJWT(googleIdToken).subscribe({
      next: () => this.isLoggedInSubject.next(true),
      error: err => console.error('Login failed:', err),
    });
  }

  logoutThenClearJWT(): void {
    const token: string | null = this.getJWT();
    if (token) {
      this.http.post(`${this.API_URL}/auth/logout`, {}, {
        headers: { Authorization: `Bearer ${token}` }
      }).subscribe({
        next: () => console.log('Logged out on server'),
        error: err => console.error('Logout error', err)
      });
    }
    this.authStorageService.removeToken();
    this.isLoggedInSubject.next(false);
    google.accounts.id.disableAutoSelect();
  }

  private checkUserLoggedIn(): void {
    const token: string | null = this.getJWT();
    if (token) {
      this.isLoggedInSubject.next(true);
    }
  }

  private getJWT(): string | null {
    return this.authStorageService.retrieveToken();
  }

  private loginWithGoogleThenStoreCustomJWT(googleIdToken: string): Observable<AuthResponse> {
    const authRequest: AuthRequest = { googleIdToken: googleIdToken };
    return this.http.post<AuthResponse>(`${this.API_URL}/auth/login`, authRequest).pipe(
      tap((resp: AuthResponse) => this.authStorageService.saveToken(resp.customToken))
    );
  }
}
