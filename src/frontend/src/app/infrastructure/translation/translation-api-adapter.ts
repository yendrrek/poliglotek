import { Inject, Injectable } from '@angular/core';
import { TranslationApiPort, TranslationResult } from '../../application/translation/translation-api-port';
import { catchError, map, Observable, of } from 'rxjs';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { TranslationRequest } from '../../domain/translation/models/translation-request';
import { environment } from '../../../environments/environment';
import { TranslationId } from '../../domain/translation/models/translation-id';
import { Translation } from '../../domain/translation/models/translation';
import { TranslatedPage } from '../../domain/translation/models/translated-page';
import { TranslationUrl } from '../../domain/translation/models/translation-url';
import { AUTH_REPOSITORY_PORT, AuthRepositoryPort } from '../../application/auth/auth-repository.port';

@Injectable({
  providedIn: 'root'
})
export class TranslationApiAdapter implements TranslationApiPort {

  constructor(
    private http: HttpClient,
    @Inject(AUTH_REPOSITORY_PORT) private authRepository: AuthRepositoryPort,
  ) {}


  translate(request: TranslationRequest): Observable<TranslationResult> {
    const token: string | undefined = this.authRepository.retrieveSession()?.getAuthToken().toString();
    if (!token) {
      return of ({
        success: false,
        translations: [],
        error: 'Nieważny token dostępu. Zaloguj się ponownie.'
      });
    }
    const headers: HttpHeaders = new HttpHeaders().set('Authorization', `Bearer ${token}`);
    const apiRequest = request.toApiRequest();
    const url: string = `${environment.baseUrl}/api/translate?` +
      `query=${encodeURIComponent(apiRequest.query)}` +
      `&langCode=${apiRequest.langCode}` +
      `&countryCode=${apiRequest.ctryCode}`;
    return this.http.get<any>(url, { headers }).pipe(
      map(resp => ({
          success: resp.success,
          translations: resp.data.map((item: any) => new Translation(
            new TranslationId(item.id),
            new TranslatedPage(item.page.body),
            new TranslationUrl(item.url)
          )),
          warning: resp.warning,
          error: resp.error
        }),
      ),
      catchError(err => of ({
        success: false,
        translations: [],
        error: err.message || 'Translation failed'
      }))
    );
  }

}
