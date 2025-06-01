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

  decodedGoogleToken(token: string): DecodedGoogleToken {
    try {
      const base64Url = token.split('.')[1];
      const base64 = base64Url.replace(/-/g, '+').replace(/_/g, '/');
      const jsonPayload = decodeURIComponent(atob(base64).split('').map(function(c) {
        return '%' + ('00' + c.charCodeAt(0).toString(16)).slice(-2);
      }).join(''));
      return JSON.parse(jsonPayload);
    } catch (err) {
      throw new Error('Invalid Google token format');
    }
  }

  createUserIdentityFromGoogleToken(googleToken: string): UserIdentity {
    const decoded: DecodedGoogleToken = this.decodedGoogleToken(googleToken);
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
}
