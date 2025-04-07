import { Component, OnInit } from '@angular/core';
import { AuthService } from '../../services/auth.service';
import { AsyncPipe } from '@angular/common';
import { Observable } from 'rxjs';
import { MatAnchor } from '@angular/material/button';

@Component({
  selector: 'log-out',
  imports: [
    AsyncPipe,
    MatAnchor
  ],
  template: `
    @if (isLoggedIn | async) {
      <a class="right-menu-item" mat-button aria-label="Wyloguj się" (click)="logout()">Wyloguj się</a>
    }
  `,
  styleUrl: '../../shared-styles/shared-styles.scss'
})
export class LogOutComponent implements OnInit{

  isLoggedIn?: Observable<boolean>;

  constructor(private authService: AuthService) {
  }

  ngOnInit(): void {
    this.isLoggedIn = this.authService.isLoggedIn;
  }

  logout(): void {
    this.authService.logoutThenClearJWT();
  }
}
