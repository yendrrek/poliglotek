import { InjectionToken } from '@angular/core';
import { GoogleSigninResponse } from '../../infrastructure/auth/google-signin-response';

export interface GoogleAuthProviderPortOut {

  extractCredential(resp: GoogleSigninResponse): string;
  disableAutoSignIn(): void;
}

export const GOOGLE_AUTH_PROVIDER_PORT_OUT =
  new InjectionToken<GoogleAuthProviderPortOut>('GoogleAuthProviderPortOut');
