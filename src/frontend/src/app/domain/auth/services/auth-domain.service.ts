import { Injectable } from '@angular/core';
import { UserIdentity } from '../models/user-identity';
import { GoogleClientId } from '../value-objects/google-client-id';
import { Email } from '../value-objects/email';
import { AuthToken } from '../value-objects/auth-token';
import { AuthSession } from '../models/auth-session';

interface DecodedGoogleToken {
  aud: string;
  email: string;
  email_verified: boolean;
  exp: number;
  name: string;
}

@Injectable({
  providedIn: 'root'
})
export class AuthDomainService {

  createUserIdentityFromGoogleToken(googleToken: string): UserIdentity {
    const decoded: DecodedGoogleToken = this.decodeGoogleToken(googleToken);
    return new UserIdentity(
      new GoogleClientId(decoded.aud),
      new Email(decoded.email),
      decoded.email_verified,
      new Date(decoded.exp * 1000),
      decoded.name
    );
  }

  createAuthSession(userIdentity: UserIdentity, customToken: string): AuthSession {
    const authToken: AuthToken = new AuthToken(customToken);
    return new AuthSession(userIdentity, authToken);
  }

  validateAuthSession(session: AuthSession): boolean {
    return session.isValid();
  }

  private decodeGoogleToken(token: string): DecodedGoogleToken {
    try {
      const base64Url: string = token.split('.')[1];
      const base64: string = base64Url.replace(/-/g, '+').replace(/_/g, '/');
      const jsonPayload: string = decodeURIComponent(atob(base64).split('').map(function(c) {
        return '%' + ('00' + c.charCodeAt(0).toString(16)).slice(-2);
      }).join(''));
      return JSON.parse(jsonPayload);
    } catch (err) {
      throw new Error('Invalid Google token format');
    }
  }
}
