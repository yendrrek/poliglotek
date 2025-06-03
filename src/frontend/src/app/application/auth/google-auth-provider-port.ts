import { InjectionToken } from '@angular/core';
import { GoogleSigninResponse } from '../../infrastructure/auth/google-signin-response';

export interface GoogleAuthProviderPort {
  extractCredential(resp: GoogleSigninResponse): string;
  disableAutoSignIn(): void;
}

export const GOOGLE_AUTH_PROVIDER_PORT =
  new InjectionToken<GoogleAuthProviderPort>('GoogleAuthProviderPortOut');
