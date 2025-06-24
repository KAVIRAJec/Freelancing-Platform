import { HttpEvent, HttpHandlerFn, HttpInterceptorFn, HttpRequest, HttpErrorResponse } from '@angular/common/http';
import { inject } from '@angular/core';
import { Observable, throwError, BehaviorSubject } from 'rxjs';
import { catchError, switchMap, filter, take } from 'rxjs/operators';
import { AuthenticationService } from '../Services/auth.service';

const isRefreshing = { value: false };
const refreshTokenSubject = new BehaviorSubject<string | null>(null);

export const refreshTokenInterceptor: HttpInterceptorFn = (req: HttpRequest<any>, next: HttpHandlerFn): Observable<HttpEvent<any>> => {
  const authService = inject(AuthenticationService);

  const handle401Error = (request: HttpRequest<any>, nextHandler: HttpHandlerFn): Observable<HttpEvent<any>> => {
    if (!isRefreshing.value) {
      isRefreshing.value = true;
      refreshTokenSubject.next(null);

      return authService.refreshToken().pipe(
        switchMap((tokenResponse: any) => {
          isRefreshing.value = false;
          sessionStorage.setItem('authToken', tokenResponse.Token);
          refreshTokenSubject.next(tokenResponse.Token);

          const cloned = request.clone({
            headers: request.headers.set('Authorization', `Bearer ${tokenResponse.Token}`),
          });

          return nextHandler(cloned);
        }),
        catchError((err) => {
          isRefreshing.value = false;
          return throwError(() => err);
        })
      );
    } else {
      return refreshTokenSubject.pipe(
        filter(token => token !== null),
        take(1),
        switchMap(token => {
          const cloned = request.clone({
            headers: request.headers.set('Authorization', `Bearer ${token}`),
          });
          return nextHandler(cloned);
        })
      );
    }
  };

  return next(req).pipe(
    catchError(error => {
      if (error instanceof HttpErrorResponse && error.status === 401) {
        return handle401Error(req, next);
      }
      return throwError(() => error);
    })
  );
};
