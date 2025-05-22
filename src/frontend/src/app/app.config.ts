import { ApplicationConfig, provideZoneChangeDetection } from '@angular/core';
import { provideRouter } from '@angular/router';
import { provideAnimationsAsync } from '@angular/platform-browser/animations/async';
import { HTTP_INTERCEPTORS, provideHttpClient, withInterceptorsFromDi } from '@angular/common/http';
import { routes } from './app.routes';
import { LoaderInterceptorService } from './infrastructure/translation/loader-interceptor.service';
import { AUTH_PORT_OUT } from './application/auth/auth-port-out';
import { GOOGLE_AUTH_PROVIDER_PORT_OUT } from './application/auth/google-auth-provider-port-out';
import { GoogleAuthProviderService } from './infrastructure/auth/google-auth-provider.service';
import { AuthService } from './infrastructure/auth/auth.service';

export const appConfig: ApplicationConfig = {
  providers: [
    provideZoneChangeDetection({ eventCoalescing: true }),
    provideRouter(routes),
    provideAnimationsAsync(),
    provideHttpClient(withInterceptorsFromDi()),
    provideAnimationsAsync(),
    { provide: HTTP_INTERCEPTORS, useClass: LoaderInterceptorService, multi: true },
    { provide: AUTH_PORT_OUT, useClass: AuthService },
    { provide: GOOGLE_AUTH_PROVIDER_PORT_OUT, useClass: GoogleAuthProviderService }
  ]
};
