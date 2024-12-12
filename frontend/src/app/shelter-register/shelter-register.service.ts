import { Injectable } from '@angular/core';
import { ShelterModel } from '../models/ShelterModel';
import { HttpClient } from '@angular/common/http';
import { AuthService } from '../../auth/auth.service';
import { Router } from '@angular/router';

@Injectable({
  providedIn: 'root',
})
export class ShelterRegisterService {
  private auth: AuthService;
  constructor(private http: HttpClient, private router: Router) {
    this.auth = new AuthService(this.http, this.router);
  }

  async createShelter(shelter: ShelterModel): Promise<any> {
    this.http
      .post<{ token: string }>(
        'http://localhost:3000/shelters/register',
        shelter
      )
      .subscribe({
        next: (response) => {
          console.log(response);
          //save in browser storage
          localStorage.setItem('token', response.token);
          this.auth.getUserRole();
        },
        error: (error) => {
          console.error(error);
          return error;
        },
      });
  }
}
