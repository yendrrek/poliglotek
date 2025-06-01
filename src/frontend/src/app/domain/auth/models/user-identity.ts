import { Email } from '../value-objects/email';
import { GoogleClientId } from '../value-objects/google-client-id';

export class UserIdentity {

  constructor(
    private readonly googleClientId: GoogleClientId,
    private readonly email: Email,
    private readonly emailVerified: boolean,
    private readonly expiresAt: Date,
    private readonly name: string,
  ) {
    this.validate();
  }

  private validate(): void {
    if (!this.name || this.name.trim().length === 0) {
      throw new Error('User name cannot be empty');
    }
  }

  getGoogleClientId(): GoogleClientId {
    return this.googleClientId;
  }

  getEmail(): Email {
    return this.email;
  }

  isEmailVerified(): boolean {
    return this.emailVerified;
  }

  getExpiresAt(): Date {
    return this.expiresAt;
  }

  isExpired(): boolean {
    return new Date() > this.expiresAt;
  }

  getName(): string {
    return this.name;
  }

  canAccessProtectedResources(): boolean {
    return this.emailVerified && !this.isExpired();
  }

  static createAnonymous(): UserIdentity {
    return new UserIdentity(
      new GoogleClientId('anonymous'),
      new Email('anonymous@example.com'),
      false,
      new Date(0),
      'Anonymous User'
    );
  }
}
