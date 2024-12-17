import { Observable, throwError, of } from 'rxjs';
import { map, catchError } from 'rxjs/operators';
import { HttpClient } from '@angular/common/http';
import { Router } from '@angular/router';
import { Injectable } from '@angular/core';

@Injectable({
  providedIn: 'root',
})
export class AuthService {
  private apiUrl = 'http://localhost:3000/auth';

  constructor(private http: HttpClient, private router: Router) {}

  isLoggedIn(): boolean {
    const token = localStorage.getItem('token');
    if(token) return true;
    return false;
  }

  getTokenPayload(): Observable<any> {
    if (typeof localStorage === 'undefined') {
      console.log('localStorage is not available.');
      return of(null);
    }
    const token = localStorage.getItem('token');

    if (token) {
      try {
        // Decode the token to get the payload
        return this.http.post(`${this.apiUrl}/token`, {}).pipe(
          map((response: any) => response.token),
          catchError((error) => {
            console.error(error);
            return throwError(error);
          })
        );
      } catch (error) {
        console.error('Invalid token:', error);
        return throwError(error);
      }
    }
    return throwError(() => new Error('No token found'));
  }

  getUserRole() {
    this.getTokenPayload().subscribe({
      next: (token) => {
        console.log('decoded token in getuserrole', token ?? '');
        const role = token?.role;
        console.log('role:', role);
        if (role === 'user') {
          this.router.navigateByUrl('/');
        } else if (role === 'shelter') {
          this.router.navigateByUrl('/shelter-manager');
        } else if (role === 'moderator') {
          this.router.navigateByUrl('/moderator');
        }
      },
      error: (error) => {
        console.error('Error fetching token payload:', error);
      },
    });
  }

  getUsername(): Observable<string> {
    return this.getTokenPayload().pipe(
      map((token) => token?.username ?? ''),
      catchError((error) => {
        console.error('Error getting username:', error);
        return of(''); // Return an empty string in case of an error
      })
    );
    
  }

  getId(): Observable<number> {
    return this.getTokenPayload().pipe(
      map((token) => parseInt(token?.id) ?? ''),
      catchError((error) => {
        console.error('Error getting id:', error);
        return of(0); // Return an empty string in case of an error
      })
    );
    
  }

  logout() {
    localStorage.removeItem('token');
  }
}
