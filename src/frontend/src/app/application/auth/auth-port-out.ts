import { UserIdentity } from '../../domain/auth/user-identity';
import { InjectionToken } from '@angular/core';

export interface AuthPortOut {

  authenticate(credentials: unknown): Promise<UserIdentity>;
  logout(): Promise<void>;
  getUserIdentity(): UserIdentity;
}

export const AUTH_PORT_OUT = new InjectionToken<AuthPortOut>('AuthPortOut');
