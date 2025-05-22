import { Injectable } from '@angular/core';
import { environment } from '../../../environments/environment';
import { BehaviorSubject, lastValueFrom, Observable } from 'rxjs';
import { HttpClient } from '@angular/common/http';
import { AuthResponse } from './auth-response';
import { AuthRequest } from './auth-request';
import { AuthStorageService } from './auth-storage.service';
import { UserIdentity } from '../../domain/auth/user-identity';
import { DecodedCredential } from './decoded-credential';
import { AuthPortOut } from '../../application/auth/auth-port-out';

@Injectable({
  providedIn: 'root'
})
export class AuthService implements AuthPortOut {

  private DEFAULT_USER_IDENTITY: UserIdentity = new UserIdentity('', false, 0, '');
  private API_URL: string = environment.apiUrl;
  private isLoggedInSubject: BehaviorSubject<boolean> = new BehaviorSubject<boolean>(false);
  isLoggedIn: Observable<boolean> = this.isLoggedInSubject.asObservable();

  constructor(private http: HttpClient,
              private authStorageService: AuthStorageService) {
  }

  async authenticate(credential: unknown): Promise<UserIdentity> {
    const googleCredential = credential as { token: string };
    if (!googleCredential || !googleCredential.token) {
      throw new Error('Invalid credentials');
    }
    const authRequest: AuthRequest = { googleIdToken: googleCredential.token };
    try {
      const resp: AuthResponse = await lastValueFrom(
        this.http.post<AuthResponse>(`${this.API_URL}/auth/login`, authRequest));
      this.authStorageService.saveToken(resp.customToken);
      const cred: DecodedCredential = this.decodeJwtResponse(resp.customToken);
      return new UserIdentity(cred.email, cred.email_verified, cred.exp, cred.name);
    } catch (err) {
      console.error('Authentication failed', err);
      return this.DEFAULT_USER_IDENTITY;
    }
  }

  async logout(): Promise<void> {
    const token: string | null = this.authStorageService.retrieveToken();
    if (token) {
      try {
        await lastValueFrom(
          this.http.post(`${this.API_URL}/auth/logout`, {}, {
            headers: { Authorization: `Bearer ${token}` }
          }));
      } catch (err) {
        console.error('Server logout failed', err);
      }
    }
    this.authStorageService.removeToken();
  }

  getUserIdentity(): UserIdentity {
    const token: string | null = this.authStorageService.retrieveToken();
    if (!token) {
      return this.DEFAULT_USER_IDENTITY;
    }
    const cred: DecodedCredential = this.decodeJwtResponse(token);
    return new UserIdentity(cred.email, cred.email_verified, cred.exp, cred.name);
  }

  private decodeJwtResponse(jwt: string): DecodedCredential {
    let base64Url: string = jwt.split('.')[1];
    let base64: string = base64Url.replace(/-/g, '+').replace(/_/g, '/');
    let jsonPayload: string = decodeURIComponent(atob(base64).split('').map((c: string): string => {
      return '%' + ('00' + c.charCodeAt(0).toString(16)).slice(-2);
    }).join(''));
    return JSON.parse(jsonPayload);
  }
}
