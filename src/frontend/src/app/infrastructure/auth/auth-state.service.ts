import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { AuthService } from './auth.service';

@Injectable({
  providedIn: 'root'
})
export class AuthStateService {

  readonly isLoggedIn: Observable<boolean>;

  constructor(private authFacadeService: AuthService) {
    this.isLoggedIn = this.authFacadeService.isLoggedIn;
  }
}
