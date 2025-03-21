import { AfterViewInit, Component, ElementRef, OnInit, ViewChild } from '@angular/core';
import { CommonModule } from '@angular/common';
import { DecodedCredential } from '../../models/decoded-credential';
import { GoogleSigninResponse } from '../../models/google-signin-response';

declare const google: any;

@Component({
  selector: 'google-signin',
  imports: [CommonModule],
  template: `
    <div class="signin-container">
      <div #googleButton id="googleButton"></div>
    </div>
  `,
  styleUrl: './google-signin.component.scss'
})
export class GoogleSigninComponent implements OnInit, AfterViewInit {

  @ViewChild('googleButton') googleButton!: ElementRef;

  ngOnInit(): void {
    this.loadGoogleScript().then(() => {
      this.initialiseGoogleSignIn();
    });
  }

  ngAfterViewInit(): void {
    if (typeof google !== 'undefined' && this.googleButton) {
      this.initialiseGoogleSignIn();
    }
  }

  private loadGoogleScript(): Promise<void> {
    return new Promise<void>((resolve) => {
      if (typeof google !== 'undefined') {
        resolve();
        return;
      }
      const script: HTMLScriptElement = document.createElement('script');
      script.src = 'https://accounts.google.com/gsi/client';
      script.async = true;
      script.defer = true;
      script.onload = () => resolve();
      document.body.appendChild(script);
    });
  }

  private initialiseGoogleSignIn(): void {
    if (typeof google !== 'undefined' && this.googleButton) {
      google.accounts.id.initialize({
        client_id: '177391411152-1ciu3vrsbsnkr9qgpke4gidbf7mvl384.apps.googleusercontent.com',
        callback: this.handleCredentialResponse.bind(this),
        auto_select: false,
        cancel_on_tap_outside: true
      });
      google.accounts.id.renderButton(
        this.googleButton.nativeElement,
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

  private handleCredentialResponse(response: GoogleSigninResponse): void {
    console.log('response: ', response);
    const userInfo: DecodedCredential = this.decodeJwtResponse(response.credential);
    console.log('responsePayLoad: ', userInfo);
    // TODO:
    // 1. Send the token to your backend for verification
    // 2. Store authentication state in your app
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
