import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { AuthFacadeService } from '../../application/auth/auth-facade.service';

@Injectable({
  providedIn: 'root'
})
export class AuthStateService {

  readonly isLoggedIn: Observable<boolean>;

  constructor(private authFacadeService: AuthFacadeService) {
    this.isLoggedIn = this.authFacadeService.isLoggedIn;
  }
}
