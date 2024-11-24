import { Injectable } from '@angular/core';
import { UserModel } from '../models/UserModel';
import { HttpClient } from '@angular/common/http';
import { response } from 'express';

@Injectable({
  providedIn: 'root',
})
export class RegisterService {
  constructor(private http: HttpClient) {}

  async createUser(user: UserModel): Promise<void> {
    console.log(`creating user: ${user.email}`);
    this.http
      .post<{ token: string }>('http://localhost:3000/users/register', user)
      .subscribe({
        next: (response) => {
          console.log(response);
          //save in users browser storage
          localStorage.setItem('token', response.token);
        },
        error: (error) => {
          console.error(error);
        },
      });
  }
}
