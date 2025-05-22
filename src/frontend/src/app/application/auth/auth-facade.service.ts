import { Inject, Injectable } from '@angular/core';
import { BehaviorSubject, Observable } from 'rxjs';
import { AUTH_PORT_OUT, AuthPortOut } from './auth-port-out';
import { GOOGLE_AUTH_PROVIDER_PORT_OUT, GoogleAuthProviderPortOut } from './google-auth-provider-port-out';
import { UserIdentity } from '../../domain/auth/user-identity';

@Injectable({
  providedIn: 'root'
})
export class AuthFacadeService {

  private isLoggedInSubject: BehaviorSubject<boolean> = new BehaviorSubject<boolean>(false);
  isLoggedIn: Observable<boolean> = this.isLoggedInSubject.asObservable();

  constructor(
    @Inject(AUTH_PORT_OUT) private authPortOut: AuthPortOut,
    @Inject(GOOGLE_AUTH_PROVIDER_PORT_OUT) private googleAuthProviderPortOut: GoogleAuthProviderPortOut
  ) {
    this.checkUserLoggedIn();
  }

  async handleGoogleCredentialResponse(resp: unknown): Promise<void> {
    try {
      const credential: { token: string } = this.googleAuthProviderPortOut.extractCredential(resp);
      const userIdentity: UserIdentity = await this.authPortOut.authenticate(credential);
      this.isLoggedInSubject.next(userIdentity.emailVerified);
    } catch (err) {
      console.error('Authentication failed', err);
    }
  }

  async logout(): Promise<void> {
    try {
      await this.authPortOut.logout();
      this.isLoggedInSubject.next(false);
      this.googleAuthProviderPortOut.disableAutoSignIn();
    } catch (err) {
      console.error('Logout failed', err);
    }
  }

  private checkUserLoggedIn(): void {
    const currentIdentity = this.authPortOut.getUserIdentity();
    this.isLoggedInSubject.next(currentIdentity.emailVerified);
  }
}
