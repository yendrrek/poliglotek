import { Injectable } from '@angular/core';
import { AuthSession } from '../../domain/auth/models/auth-session';
import { UserIdentity } from '../../domain/auth/models/user-identity';
import { GoogleClientId } from '../../domain/auth/value-objects/google-client-id';
import { Email } from '../../domain/auth/value-objects/email';
import { AuthToken } from '../../domain/auth/value-objects/auth-token';

@Injectable({
  providedIn: 'root'
})
export class AuthStorageRepository {

  private readonly SESSION_KEY: string = 'auth_session';

  saveSession(session:AuthSession): void {
    try {
      const serialised = {
        userIdentity: {
          googleClientId: session.getUserIdentity().getGoogleClientId().toString(),
          email: session.getUserIdentity().getEmail().toString(),
          emailVerified: session.getUserIdentity().isEmailVerified(),
          expiresAt: session.getUserIdentity().getExpiresAt().toString(),
          name: session.getUserIdentity().getName(),
        },
        authToken: session.getAuthToken().toString(),
        createdAt: session.getCreatedAt().toISOString(),
      };
      sessionStorage.setItem(this.SESSION_KEY, JSON.stringify(serialised));
    } catch (err) {
      console.error('Error saving session', err);
      throw new Error('Failed to save authenticate session.');
    }
  }

  retrieveSession(): AuthSession | null {
    try {
      const stored: string | null = sessionStorage.getItem(this.SESSION_KEY);
      if (!stored) return null;
      const parsed = JSON.parse(stored);
      const userIdentity = new UserIdentity(
        new GoogleClientId(parsed.userIdentity.googleClientId),
        new Email(parsed.userIdentity.email),
        parsed.userIdentity.emailVerified,
        new Date(parsed.userIdentity.expiresAt),
        parsed.userIdentity.name
      );
      return new AuthSession(userIdentity, new AuthToken(parsed.authToken), new Date(parsed.createdAt));
    } catch (err) {
      console.error('Error retrieving auth session', err);
      return null;
    }
  }

  clearSession(): void {
    sessionStorage.removeItem(this.SESSION_KEY);
  }
}
