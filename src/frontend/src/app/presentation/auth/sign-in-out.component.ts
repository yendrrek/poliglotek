import { ChangeDetectorRef, Component, ElementRef, HostListener, OnInit, ViewChild } from '@angular/core';
import { AuthFacadeService } from '../../application/auth/auth-facade.service';
import { GoogleSigninResponse } from '../../infrastructure/auth/google-signin-response';
import { AsyncPipe } from '@angular/common';
import { Observable } from 'rxjs';
import { MatAnchor } from '@angular/material/button';

declare const google: any;

@Component({
  selector: 'google-signin',
  template: `
    @if (!(isLoggedIn | async)) {
      <div class="signin" #googleSignInButton></div>
    } @else {
      <a class="right-menu-item" mat-button aria-label="Wyloguj się" (click)="logout()">Wyloguj się</a>
    }
  `,
  imports: [
    AsyncPipe,
    MatAnchor
  ],
  styleUrls: ['./sign-in-out.component.scss', '../shared/shared-styles.scss']
})
export class SignInOutComponent implements OnInit {

  @ViewChild('googleSignInButton') googleSignInButton?: ElementRef;

  isLoggedIn?: Observable<boolean>;

  constructor(
    public authService: AuthFacadeService,
    private changeDetector: ChangeDetectorRef
  ) {}

  ngOnInit(): void {
    this.isLoggedIn = this.authService.isLoggedIn;
    this.loadGoogleScript().then(() => {
      this.isLoggedIn?.subscribe((isLoggedIn: boolean) => {
        if (!isLoggedIn) {
          this.changeDetector.detectChanges();
          this.handleGoogleSignIn();
        }
      });
    });
  }

  @HostListener('window:beforeunload', ['$event'])
  logout(): void {
    this.authService.logoutThenClearJWT();
  }

  private loadGoogleScript(): Promise<void> {
    return new Promise<void>((resolve) => {
      if (typeof google !== 'undefined') {
        resolve();
        return;
      }
      document.body.appendChild(this.buildScriptElement(resolve));
    });
  }

  private buildScriptElement(resolve: any): HTMLScriptElement {
    const scriptElement: HTMLScriptElement = document.createElement('script');
    scriptElement.src = 'https://accounts.google.com/gsi/client?hl=pl';
    scriptElement.async = true;
    scriptElement.defer = true;
    scriptElement.onload = () => resolve();
    return scriptElement;
  }

  private handleGoogleSignIn(): void {
    if (this.googleSignInButton) {
      this.initialiseSignIn();
      this.renderSignInButton();
    }
  }

  private initialiseSignIn(): void {
    google.accounts.id.initialize({
      client_id: '177391411152-1ciu3vrsbsnkr9qgpke4gidbf7mvl384.apps.googleusercontent.com',
      callback: (resp: GoogleSigninResponse) => {
        this.authService.handleCredentialResponse(resp);
      },
      auto_select: false,
      cancel_on_tap_outside: true
    });
  }

  private renderSignInButton(): void {
    if (this.googleSignInButton) {
      google.accounts.id.renderButton(
        this.googleSignInButton.nativeElement,
        {
          theme: "filled_white",
          size: "medium",
          type: "standard",
          shape: "rectangular",
          text: "sign_in_with",
          logo_alignment: "left",
          width: 215,
          locale: "pl"
        }
      );
    }
  }
}
