import { CanActivateFn, Router } from '@angular/router';
import { inject } from '@angular/core';
import { AuthService } from './auth.service';
import { Observable, of } from 'rxjs';
import { map, catchError } from 'rxjs/operators';

export const userGuard: CanActivateFn = (route, state) => {
  const authService = inject(AuthService);
  return authService.getTokenPayload().pipe(
    map((payload) => {
      if (payload && payload.role === 'user') {
        return true;
      } else {
        alert('You are not logged in');
        return false;
      }
    }),
    catchError(() => {
      alert('You are not logged in');
      return of(false);
    })
  );
};

export const shelterGuard: CanActivateFn = (route, state) => {
  const authService = inject(AuthService);
  return authService.getTokenPayload().pipe(
    map((payload) => {
      if (payload && payload.role === 'shelter') {
        return true;
      } else {
        alert('You cannot access this page.')
        return false;
      }
    }),
    catchError(() => {
      alert('You cannot access this page.')
      return of(false);
    })
  );
};

export const moderatorGuard: CanActivateFn = (route, state) => {
  const authService = inject(AuthService);
  return authService.getTokenPayload().pipe(
    map((payload) => {
      if (payload && payload.role === 'moderator') {
        return true;
      } else {
        alert('You cannot access this page.')
        return false;
      }
    }),
    catchError(() => {
      alert('You cannot access this page.')
      return of(false);
    })
  );
};
