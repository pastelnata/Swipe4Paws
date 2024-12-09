import {
  HttpEvent,
  HttpHandler,
  HttpInterceptor,
  HttpRequest,
} from '@angular/common/http';
import { Observable } from 'rxjs';

export class AuthInterceptor implements HttpInterceptor {
  constructor() {}

  intercept(
    req: HttpRequest<any>,
    next: HttpHandler
  ): Observable<HttpEvent<unknown>> {
    console.log('Intercepted!', req);
    const localToken = localStorage.getItem('token');
    req = req.clone({
      headers: req.headers.set('Authorization', `Bearer ${localToken}`),
    });
    return next.handle(req);
  }
}
