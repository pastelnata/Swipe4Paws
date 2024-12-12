import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';



@Injectable({
  providedIn: 'root',
})
export class LoginService {
  private apiUrl = 'http://localhost:3000/users';

  constructor(private http: HttpClient) {}

  /** Log in the user/moderator/shelter and returns the token it belongs to*/
  loginUser(email: string, password: string): Observable<{ token: string }> {
    console.log(`Logging in user: ${email}`);
    return this.http.post<{ token: string }>(`${this.apiUrl}/login`, { email, password });
  }

  getToken() {
    const token = localStorage.getItem('token');
    return token;
  }

  //logout user, moderator and shelter
  logout(): void {
    localStorage.removeItem('token');
    console.log('Token is removed. User is logged out.');
  }
  //loginModerator
  //loginShelter
}

