import { Injectable } from '@angular/core';
import { GoogleAuthProviderPortOut } from '../../application/auth/google-auth-provider-port-out';

declare const google: any;

@Injectable({
  providedIn: 'root'
})
export class GoogleAuthProviderService implements GoogleAuthProviderPortOut {

  extractCredential(resp: any): { token: string } {
    if (!resp || !resp.credential) {
      throw new Error('Invalid Google response');
    }
    return { token: resp.credential };
  }

  disableAutoSignIn(): void {
    if (google && google.accounts && google.accounts.id) {
      google.accounts.id.disableAutoSignIn();
    }
  }
}
