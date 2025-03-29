import { AfterViewInit, Component, ElementRef, ViewChild } from '@angular/core';
import { CommonModule } from '@angular/common';
import { AuthService } from '../../services/auth.service';
import { GoogleSigninResponse } from '../../models/google-signin-response';

declare const google: any;

@Component({
  selector: 'google-signin',
  imports: [CommonModule],
  template: `
    @if (!authService.isLoggedIn()) {
      <div class="signin-container">
        <div #googleSignInButton></div>
      </div>
    }
    @if (authService.isLoggedIn()) {
      <div>
        <p>Logowanie powiodło się!</p>
        <button (click)="authService.logoutThenClearJWT()"></button>
      </div>
    }
  `,
  styleUrl: './auth.component.scss'
})
export class AuthComponent implements AfterViewInit {

  @ViewChild('googleSignInButton') googleSignInButton!: ElementRef;

  constructor(public authService: AuthService) {}

  ngAfterViewInit(): void {
    this.loadGoogleScript().then(() => this.handleGoogleSignIn());
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
      callback: (resp: GoogleSigninResponse) => this.authService.handleCredentialResponse(resp),
      auto_select: false,
      cancel_on_tap_outside: true
    });
  }

  private renderSignInButton(): void {
    google.accounts.id.renderButton(
      this.googleSignInButton.nativeElement,
      {
        theme: "outline",
        size: "large",
        type: "standard",
        shape: "rectangular",
        text: "sign_in_with",
        logo_alignment: "left",
        width: 240,
        locale: "pl"
      }
    );
  }
}
