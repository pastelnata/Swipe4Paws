import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root',
})
export class SettingsService {
  private apiUrl = 'http://localhost:3000';

  constructor(private http: HttpClient) {}

  updateUser(
    userId: number,
    username: string,
    email: string,
    password: string
  ): Observable<{ token: string }> {
    try {
      console.log('Updating user in service:', userId);
      return this.http.put<{ token: string }>(
        `${this.apiUrl}/users/settings/${userId}`,
        { username, email, password },
        { headers: { 'Content-Type': 'application/json' } }
      );
    } catch (error) {
      console.error('Error updating user:', error);
      throw error;
    }
  }

  updateShelter(
    shelterId: number,
    name: string,
    email: string,
    password: string,
    address: string,
    postal_code: string,
    city: string,
    description: string
  ): Observable<{ token: string }> {
    try {
      return this.http.put<{ token: string }>(
        `${this.apiUrl}/shelters/settings/${shelterId}`,
        {
          shelterId,
          name,
          email,
          password,
          address,
          postal_code,
          city,
          description,
        },
        { headers: { 'Content-Type': 'application/json' } }
      );
    } catch (error) {
      console.error('Error updating shelter:', error);
      throw error;
    }
  }
}
