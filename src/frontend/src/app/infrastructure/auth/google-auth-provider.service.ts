import { Injectable } from '@angular/core';
import { GoogleAuthProviderPortOut } from '../../application/auth/google-auth-provider-port-out';
import { GoogleSigninResponse } from './google-signin-response';

declare const google: any;

@Injectable({
  providedIn: 'root'
})
export class GoogleAuthProviderService implements GoogleAuthProviderPortOut {

  extractCredential(resp: GoogleSigninResponse): string {
    if (!resp || !resp.credential) {
      throw new Error('Invalid Google response');
    }
    return resp.credential;
  }

  disableAutoSignIn(): void {
    if (google && google.accounts && google.accounts.id) {
      google.accounts.id.disableAutoSelect();
    }
  }
}
