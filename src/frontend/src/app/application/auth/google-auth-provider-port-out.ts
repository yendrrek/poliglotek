import { InjectionToken } from '@angular/core';

export interface GoogleAuthProviderPortOut {

  extractCredential(resp: unknown): { token: string };
  disableAutoSignIn(): void;
}

export const GOOGLE_AUTH_PROVIDER_PORT_OUT =
  new InjectionToken<GoogleAuthProviderPortOut>('GoogleAuthProviderPortOut');
