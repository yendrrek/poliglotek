import { UserIdentity } from '../../domain/auth/user-identity';
import { InjectionToken } from '@angular/core';
import { Observable } from 'rxjs';

export interface AuthPortOut {

  login(credential: string): Observable<UserIdentity>;
  logout(): Observable<void>;
}

export const AUTH_PORT_OUT = new InjectionToken<AuthPortOut>('AuthPortOut');
