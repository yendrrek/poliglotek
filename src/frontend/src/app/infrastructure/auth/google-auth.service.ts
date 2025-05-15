import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { BehaviorSubject, Observable } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class GoogleAuthService {

  private userSubject = new BehaviorSubject<any>(null);
  user = this.userSubject.asObservable();

  constructor(private http: HttpClient) {}

  verifyGoogleToken(token: string): Observable<any> {
    return this.http.post<any>('api/auth/google', { token });
  }

  setUser(user: any): void {
    this.userSubject.next(user);
    localStorage.setItem('user', JSON.stringify(user));
  }

  getUser(): any {
    return this.userSubject.value;
  }

  isLoggedIn(): boolean {
    return !!this.userSubject.value;
  }

  logout(): void {
    this.userSubject.next(null);
    localStorage.removeItem('user');
  }
}
