import { HttpEvent, HttpHandler, HttpInterceptor, HttpRequest } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';

@Injectable()
export class AuthInterceptor implements HttpInterceptor {
  constructor() { }

  // this happens every time there is a http request
  intercept(req: HttpRequest<any>, next: HttpHandler): Observable<HttpEvent<unknown>> {
    console.log('Intercepted!', req); //debug line
    // gets token from local storage
    const localToken = localStorage.getItem('token');
    // clones the request and adds the token to it
    if(localToken)
    {
      req = req.clone({ headers: req.headers.set('Authorization', `Bearer ${localToken}`) }); 
    }
    return next.handle(req);
  }
}
