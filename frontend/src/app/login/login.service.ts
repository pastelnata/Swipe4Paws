import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { map, Observable } from 'rxjs';
import { UserModel } from '../models/UserModel';
import { jwtDecode } from 'jwt-decode';



@Injectable({
  providedIn: 'root',
})

export class LoginService {
  private apiUrl = 'http://localhost:3000/users';
  private tokenKey = 'token'; //key for storing token in local storage
  loggedInUser!: UserModel;
  isModerator = false;
  isShelter = false;

  constructor(private http: HttpClient) {}

  /** Log in the user */
  loginUser(user: UserModel): Observable<{ token: string }> {
    console.log(`Logging in user: ${user.email}`);
    return this.http.post<{ success: Boolean; token: string }>(`${this.apiUrl}/login`, body).pipe(
      map(response => {
        if (response && response.token){
          console.log('Token received', response.token);
          localStorage.setItem(this.tokenKey, response.token);
          this.decodeToken(response.token);
        }
        return response;
      })
    );
  }
  //** logout user, clear the token */
  logOut(): void {
    localStorage.removeItem(this.tokenKey);
    this.loggedInUser = undefined as unknown as UserModel;
    this.isModerator = false;
    this.isShelter = false;
    console.log('User logged out');
}
  //* is logged in now?*/
  isLoggedIn(): boolean {
  return !!localStorage.getItem(this.tokenKey);
}
  //* decode token and get user information */
  private decodeToken(token: string): void {
    const decoded: any = jwtDecode(token);
    this.loggedInUser = {
      userid: decoded.userid || decoded.modid || decoded.shelterid,
      username: decoded.username,
      email: decoded.email,
      password: '', // Password not included in token for security reasons
    };
    this.isModerator = decoded.isModerator || false;
    this.isShelter = decoded.isShelter || false;
    console.log('Decoded token:', decoded);
  }
  /** Get the current username from the decoded token */
  getCurrentUsername(): string | null {
    const token = localStorage.getItem(this.tokenKey);
    if (token) {
      const decoded: any = jwtDecode(token);
      return decoded.username;
    }
    console.error('Error getting the username. Token is null.');
    return null;
  }
  /** Get the current user role (isModerator) */
  getIsModerator(): boolean | null {
    const token = localStorage.getItem(this.tokenKey);
    if (token) {
      const decoded: any = jwtDecode(token);
      return decoded.isModerator || false;
    }
    console.error('Error getting isManager permissions. Token is null.');
    return null;
  }
  //** Get the current shelter role (isShelter) */
  getIsShelter(): boolean | null {
    const token = localStorage.getItem(this.tokenKey);
    if (token) {
      const decoded: any = jwtDecode(token);
      return decoded.isShelter || false;
    }
    console.error('Error getting isShelter permissions. Token is null.');
    return null;
  }
  /** Get the email of the currently logged-in user */
  getEmail(): string | null {
    const token = localStorage.getItem(this.tokenKey);
    if (token) {
      const decoded: any = jwtDecode(token);
      return decoded.email;
    }
    console.error('Error getting the email. Token is null.');
    return null;
  }
}

