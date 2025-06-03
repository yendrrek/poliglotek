import { Inject, Injectable } from '@angular/core';
import { BehaviorSubject, catchError, EMPTY, map, Observable, of, tap } from 'rxjs';
import { AUTH_API_PORT, AuthApiPort } from './auth-api-port';
import { GOOGLE_AUTH_PROVIDER_PORT, GoogleAuthProviderPort } from './google-auth-provider-port';
import { GoogleSigninResponse } from '../../infrastructure/auth/google-signin-response';
import { AuthStorageService } from '../../infrastructure/auth/auth-storage.service';
import { UserIdentity } from '../../domain/auth/models/user-identity';
import { AuthSession } from '../../domain/auth/models/auth-session';
import { AUTH_REPOSITORY_PORT, AuthRepositoryPort } from './auth-repository.port';
import { AuthDomainService } from '../../domain/auth/services/auth-domain.service';
import { AuthResponse } from '../../infrastructure/auth/models/auth-response.model';

@Injectable({
  providedIn: 'root'
})
export class AuthFacadeService {

  // private isLoggedInSubject: BehaviorSubject<boolean> = new BehaviorSubject<boolean>(false);
  // isLoggedIn: Observable<boolean> = this.isLoggedInSubject.asObservable();

  private authSessionSubject: BehaviorSubject<AuthSession | null>
    = new BehaviorSubject<AuthSession | null>(null);
  readonly authSession: Observable<AuthSession | null> = this.authSessionSubject.asObservable();
  readonly isAuthenticated: Observable<boolean> = this.authSession.pipe(
    map((session: AuthSession | null) => session?.isValid() ?? false)
  );
  readonly currentUser = this.authSession.pipe(
    map((session: AuthSession | null) => session?.getUserIdentity() ?? null)
  );

  constructor(
    @Inject(AUTH_API_PORT) private authApi: AuthApiPort,
    @Inject(AUTH_REPOSITORY_PORT) private authRepository: AuthRepositoryPort,
    @Inject(GOOGLE_AUTH_PROVIDER_PORT) private googleAuthProvider: GoogleAuthProviderPort,
    private authStorageService: AuthStorageService,
    private authDomainService: AuthDomainService,
  ) {
    // this.isLoggedInSubject.next(!!this.authStorageService.retrieveToken());
    this.initialiseAuthState();
  }

  private initialiseAuthState(): void {
    const existingSession: AuthSession | null = this.authRepository.getSession();
    if (existingSession && this.authDomainService.validateAuthSession(existingSession)) {
      this.authSessionSubject.next(existingSession);
    } else {
      this.authRepository.clearSession();
      this.authSessionSubject.next(null);
    }
  }

  handleGoogleCredentialResponse(resp: GoogleSigninResponse): Observable<void> {
    try {
      const googleIdToken: string = this.googleAuthProvider.extractCredential(resp);
      const userIdentity: UserIdentity = this.authDomainService.createUserIdentityFromGoogleToken(googleIdToken);
      if (!userIdentity.isEmailVerified()) {
        console.warn('User email not verified');
        this.authSessionSubject.next(null);
        return of(undefined);
      }
      return this.authApi.login(googleIdToken).pipe(
        tap((authResponse: AuthResponse) => {
          const authSession: AuthSession = this.authDomainService.createAuthSession(
            userIdentity,
            authResponse.customToken
          );
          this.authRepository.saveSession(authSession);
          this.authSessionSubject.next(authSession);
          console.info('User authenticated: ', userIdentity.getEmail().toString());
        }),
        map(() => undefined),
        catchError(error => {
          console.error('Login failed:', error);
          this.authSessionSubject.next(null);
          return EMPTY;
        })
      );

      //   switchMap((): Observable<never> => EMPTY),
      //   catchError(error => {
      //     console.error('Login failed:', error);
      //     this.isLoggedInSubject.next(false);
      //     return EMPTY;
      //   })
      // );
    } catch (err) {
      console.error('Invalid Google credentials:', err);
      this.authSessionSubject.next(null);
      return EMPTY;
    }
  }

  logout(): Observable<void> {
    const currentSession: AuthSession | null = this.authSessionSubject.getValue();

    if (!currentSession) {
      return of(undefined);
    }

    const authToken: string = currentSession.getAuthToken().toString();
    return this.authApi.logout(authToken).pipe(
      tap(() => {
        this.authRepository.clearSession();
        this.authSessionSubject.next(null);
        // this.isLoggedInSubject.next(false);
        this.googleAuthProvider.disableAutoSignIn();
        console.info('User logged out');
      }),
      catchError(err => {
        console.error('Server logout failed', err);
        // this.isLoggedInSubject.next(false);
        this.authRepository.clearSession();
        this.authSessionSubject.next(null);
        this.googleAuthProvider.disableAutoSignIn();
        return EMPTY;
      })
    );
  }
}
