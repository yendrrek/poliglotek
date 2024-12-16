import { HttpErrorResponse } from '@angular/common/http';
import { Observable, throwError } from 'rxjs';

export function handleHttpError(error: HttpErrorResponse): Observable<never> {
  if (error.error instanceof  ErrorEvent) {
    console.warn('Client-side error', error.message);
  } else {
    console.warn('Server-side error', error.status);
  }
  return throwError((): Error => new Error(error.message));
}
