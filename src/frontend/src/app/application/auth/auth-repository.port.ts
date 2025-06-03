import { AuthSession } from '../../domain/auth/models/auth-session';
import { InjectionToken } from '@angular/core';

export interface AuthRepositoryPort {
  saveSession(session: AuthSession): void;
  getSession(): AuthSession | null;
  clearSession(): void;
}

export const AUTH_REPOSITORY_PORT = new InjectionToken<AuthRepositoryPort>('AuthRepositoryPort');
