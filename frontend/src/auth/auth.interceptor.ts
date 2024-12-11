import {
  HttpEvent,
  HttpHandler,
  HttpInterceptor,
  HttpRequest,
} from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';

@Injectable()
export class AuthInterceptor implements HttpInterceptor {

  // this happens every time there is a http request
  intercept(
    req: HttpRequest<any>,
    next: HttpHandler
  ): Observable<HttpEvent<any>> {
    console.log('Intercepted!', req); //debug line
    
    // gets token from local storage
    const token = localStorage.getItem('token');
    // clones the request and adds the token to it
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
