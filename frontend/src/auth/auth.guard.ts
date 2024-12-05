import { CanActivateFn } from '@angular/router';
import { Router } from '@angular/router';

export default class Auth {
  constructor(private router: Router) {}
  getTokenPayload = () => {
    const token = localStorage.getItem('token');
    if (token) {
      // Decode the token to get the payload
      return JSON.parse(atob(token.split('.')[1]));
    }
    return null;
  };
  
  userGuard: CanActivateFn = (route, state) => {
    const payload = this.getTokenPayload();
    // returns true if payload exists and the role is user
    return payload && payload.role === 'user';
  };
  
  shelterGuard: CanActivateFn = (route, state) => {
    const payload = this.getTokenPayload();
    return payload && payload.role === 'shelter';
  };
  
  moderatorGuard: CanActivateFn = (route, state) => {
    const payload = this.getTokenPayload();
    return payload && payload.role === 'moderator';
  }

  getUserRole() {
    const payload = this.getTokenPayload();
    const role = payload?.role
    if (role === 'user') {
      this.router.navigateByUrl('/');
    }
    else if (role === 'shelter') {
      this.router.navigateByUrl('/shelter-app');
    }
    else if (role === 'moderator') {
      this.router.navigateByUrl('/moderator');
    }
  }
}
