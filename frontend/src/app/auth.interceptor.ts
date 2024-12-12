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
  ): Observable<HttpEvent<any>> {
    console.log('Intercepted!', req);
    const token = localStorage.getItem('token');
    if (token) {
      req = req.clone({
        headers: req.headers.set("Authorization",
          "Bearer " + token)
      });
      console.log('Token added to HTTP request'); 
    }
    else {
      //No token; proceed request without bearer token
      console.log('No token added to HTTP request');
    }
    return next.handle(req);
  }
}
