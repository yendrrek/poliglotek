import { ApplicationConfig, provideZoneChangeDetection } from '@angular/core';
import { provideRouter } from '@angular/router';
import { provideAnimationsAsync } from '@angular/platform-browser/animations/async';
import { HTTP_INTERCEPTORS, provideHttpClient, withInterceptorsFromDi } from '@angular/common/http';
import { routes } from './app.routes';
import { LoaderInterceptorService } from './infrastructure/translation/loader-interceptor.service';
import { AUTH_API_PORT } from './application/auth/auth-api-port';
import { GOOGLE_AUTH_PROVIDER_PORT } from './application/auth/google-auth-provider-port';
import { GoogleAuthProviderService } from './infrastructure/auth/google-auth-provider.service';
import { AuthApiAdapter } from './infrastructure/auth/auth-api-adapter';
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
    { provide: GOOGLE_AUTH_PROVIDER_PORT, useClass: GoogleAuthProviderService },
    { provide: GOOGLE_AUTH_PROVIDER_PORT, useClass: GoogleAuthProviderService },
    { provide: AUTH_API_PORT, useClass: AuthApiAdapter },
    { provide: AUTH_REPOSITORY_PORT, useClass: AuthStorageRepository },
    { provide: AUTH_API_PORT, useClass: AuthApiAdapter },
    { provide: TRANSLATION_REPOSITORY_PORT, useClass: TranslationStorageRepository},
    { provide: TRANSLATION_API_PORT, useClass: TranslationApiAdapter },
    TranslationApplicationService,
    AuthFacadeService,
    TranslationViewModelService
  ]
};
