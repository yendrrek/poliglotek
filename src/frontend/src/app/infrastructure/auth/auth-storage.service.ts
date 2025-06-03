import { Injectable } from '@angular/core';

@Injectable({
  providedIn: 'root'
})
export class AuthStorageService {

  private readonly TOKEN_KEY: 'token' = 'token';

  retrieveToken(): string | null {
    return sessionStorage.getItem(this.TOKEN_KEY);
  }

  saveToken(token: string) {
    sessionStorage.setItem(this.TOKEN_KEY, token);
  }

  removeToken(): void {
    sessionStorage.removeItem(this.TOKEN_KEY);
  }
}
