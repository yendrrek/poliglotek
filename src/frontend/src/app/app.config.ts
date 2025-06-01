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
import { TranslationApplicationService } from './application/translation/translation-application.service';
import { AuthFacadeService } from './application/auth/auth-facade.service';
import { TranslationViewModelService } from './presentation/translation/translation-view-model.service';
import { TRANSLATION_REPOSITORY_PORT } from './application/translation/translation-repository-port';
import { TranslationStorageRepository } from './infrastructure/translation/translation-storage.repository';
import { TRANSLATION_API_PORT } from './application/translation/translation-api-port';
import { TranslationApiAdapter } from './infrastructure/translation/translation-api-adapter';
import { AUTH_REPOSITORY_PORT } from './application/auth/auth-repository.port';
import { AuthStorageRepository } from './infrastructure/auth/auth-storage.repository';

export const appConfig: ApplicationConfig = {
  providers: [
    provideZoneChangeDetection({ eventCoalescing: true }),
    provideRouter(routes),
    provideAnimationsAsync(),
    provideHttpClient(withInterceptorsFromDi()),
    provideAnimationsAsync(),
    { provide: HTTP_INTERCEPTORS, useClass: LoaderInterceptorService, multi: true },
    { provide: AUTH_PORT_OUT, useClass: AuthService },
    { provide: GOOGLE_AUTH_PROVIDER_PORT_OUT, useClass: GoogleAuthProviderService },
    { provide: AUTH_PORT_OUT, useClass: AuthService },
    { provide: GOOGLE_AUTH_PROVIDER_PORT_OUT, useClass: GoogleAuthProviderService },
    { provide: TRANSLATION_REPOSITORY_PORT, useClass: TranslationStorageRepository },
    { provide: TRANSLATION_API_PORT, useClass: TranslationApiAdapter },
    { provide: AUTH_REPOSITORY_PORT, useClass: AuthStorageRepository },
    TranslationApplicationService,
    AuthFacadeService,
    TranslationViewModelService
  ]
};
