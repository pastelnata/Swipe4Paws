import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { SheltersListing } from '../models/shelters-listing';

@Injectable({
  providedIn: 'root',
})
export class ModeratorService {
  private apiUrl = 'http://localhost:3000/shelters';

  constructor(private http: HttpClient) {}

  getShelters(): Observable<any> {
    try {
      console.log('Fetching shelters');
      return this.http.get<SheltersListing[]>(`${this.apiUrl}`);
    } catch (error) {
      console.error('Error fetching shelters:', error);
      throw error;
    }
  }

  updateShelterStatus(id: number, status: string): Observable<any> {
    try {
      console.log(id, status);
      return this.http.patch(`${this.apiUrl}/${id}`, { status: status} );
    } catch (error) {
      console.error('Error updating shelter status:', error);
      throw error;
    }
  }
}
