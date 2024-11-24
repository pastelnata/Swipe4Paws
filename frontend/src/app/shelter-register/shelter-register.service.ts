import { Injectable } from '@angular/core';
import { ShelterModel } from '../models/ShelterModel';
import { HttpClient } from '@angular/common/http';

@Injectable({
  providedIn: 'root',
})
export class ShelterRegisterService {
  constructor(private http: HttpClient) {}

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
        },
        error: (error) => {
          console.error(error);
          return error;
        },
      });
  }
}
