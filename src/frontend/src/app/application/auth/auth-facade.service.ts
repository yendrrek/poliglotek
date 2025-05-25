import { Inject, Injectable } from '@angular/core';
import { BehaviorSubject, catchError, EMPTY, Observable, switchMap, tap } from 'rxjs';
import { AUTH_PORT_OUT, AuthPortOut } from './auth-port-out';
import { GOOGLE_AUTH_PROVIDER_PORT_OUT, GoogleAuthProviderPortOut } from './google-auth-provider-port-out';
import { UserIdentity } from '../../domain/auth/user-identity';
import { GoogleSigninResponse } from '../../infrastructure/auth/google-signin-response';
import { AuthStorageService } from '../../infrastructure/auth/auth-storage.service';

@Injectable({
  providedIn: 'root'
})
export class AuthFacadeService {

  private isLoggedInSubject: BehaviorSubject<boolean> = new BehaviorSubject<boolean>(false);
  isLoggedIn: Observable<boolean> = this.isLoggedInSubject.asObservable();

  constructor(
    @Inject(AUTH_PORT_OUT) private authPortOut: AuthPortOut,
    @Inject(GOOGLE_AUTH_PROVIDER_PORT_OUT) private googleAuthProviderPortOut: GoogleAuthProviderPortOut,
    private authStorageService: AuthStorageService,
  ) {
    this.isLoggedInSubject.next(!!this.authStorageService.retrieveToken());
  }

  handleGoogleCredentialResponse(resp: GoogleSigninResponse): Observable<void> {
    try {
      const googleIdToken: string = this.googleAuthProviderPortOut.extractCredential(resp);
      return this.authPortOut.authenticate(googleIdToken).pipe(
        tap((userIdentity: UserIdentity) => {
          console.info('User verified: ', userIdentity.emailVerified);
          this.isLoggedInSubject.next(userIdentity.emailVerified);
        }),
        switchMap((): Observable<never> => EMPTY),
        catchError(error => {
          console.error('Login failed:', error);
          this.isLoggedInSubject.next(false);
          return EMPTY;
        })
      );
    } catch (error) {
      console.error('Invalid credentials:', error);
      return EMPTY;
    }
  }

  logout(): Observable<void> {
    return this.authPortOut.logout().pipe(
      tap(() => {
        this.isLoggedInSubject.next(false);
        this.googleAuthProviderPortOut.disableAutoSignIn();
        // google.accounts.id.disableAutoSignIn();
      }),
      catchError(error => {
        console.error('Logout error', error);
        // Still update the UI state even if server logout fails
        this.isLoggedInSubject.next(false);
        this.googleAuthProviderPortOut.disableAutoSignIn();
        // google.accounts.id.disableAutoSignIn();
        return EMPTY;
      })
    );
  }
}
