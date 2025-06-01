import { UserIdentity } from './user-identity';
import { AuthToken } from '../value-objects/auth-token';

export class AuthSession {

  constructor(
    private readonly userIdentity: UserIdentity,
    private readonly authToken: AuthToken,
    private readonly createdAt: Date = new Date()
  ) {}

  getUserIdentity(): UserIdentity {
    return this.userIdentity;
  }
  getAuthToken(): AuthToken {
    return this.authToken;
  }
  getCreatedAt(): Date {
    return this.createdAt;
  }

  isValid(): boolean {
    return !this.authToken.isExpired() && this.userIdentity.canAccessProtectedResources();
  }

  static createInvalidSession(): AuthSession {
    return new AuthSession(
      UserIdentity.createAnonymous(),
      new AuthToken('invalid'),
      new Date()
    );
  }
}
