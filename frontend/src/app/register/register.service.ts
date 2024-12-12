import { Injectable } from '@angular/core';
import { UserModel } from '../models/UserModel';
import { HttpClient } from '@angular/common/http';
import { response } from 'express';
import { AuthService } from '../../auth/auth.service';
import { Router } from '@angular/router';

@Injectable({
  providedIn: 'root',
})
export class RegisterService {
  private auth: AuthService;
  constructor(private http: HttpClient, private router: Router) {
    this.auth = new AuthService(this.http, this.router);
  }

  async createUser(user: UserModel): Promise<void> {
    console.log(`creating user: ${user.email}`);
    this.http
      .post<{ token: string }>('http://localhost:3000/users/register', user)
      .subscribe({
        next: (response) => {
          console.log(response);
          localStorage.setItem('token', response.token);
          //gets user role & redirects to certain page accordingly
          this.auth.getUserRole();
        },
        error: (error) => {
          console.error(error);
        },
      });
  }
}
