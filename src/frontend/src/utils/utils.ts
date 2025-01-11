import { HttpErrorResponse } from '@angular/common/http';
import { Observable, throwError } from 'rxjs';

export function handleHttpError(err: HttpErrorResponse): Observable<never> {
  if (err.error instanceof  ErrorEvent) {
    console.warn("Client-side error", err);
  } else {
    console.warn("Server-side error", err);
  }
  return throwError((): Error => new Error(err.message));
}
