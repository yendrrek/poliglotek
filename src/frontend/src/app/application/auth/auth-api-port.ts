import { InjectionToken } from '@angular/core';
import { Observable } from 'rxjs';
import { AuthResponse } from '../../infrastructure/auth/models/auth-response.model';

export interface AuthApiPort {
  login(credential: string): Observable<AuthResponse>;
  logout(authToken: string): Observable<void>;
}

export const AUTH_API_PORT = new InjectionToken<AuthApiPort>('AuthPortOut');
