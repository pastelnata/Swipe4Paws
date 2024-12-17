import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Observable } from 'rxjs';
import { PetsListing } from '../models/pets-listing';

@Injectable({
  providedIn: 'root'
})
export class ShelterAppService {
  private apiUrl = 'http://localhost:3000/pets';

  constructor(private http: HttpClient) { }

  // Fetch all pets
  getPets(): Observable<PetsListing[]> {
    try {
      console.log('Fetching pets');
      return this.http.get<PetsListing[]>(this.apiUrl);
    } catch (error) {
      console.error('Error fetching pets:', error);
      throw error;
    }
  }

  // Add a new pet
  addPet(newPet: PetsListing): Observable<PetsListing> {
    try {
      console.log('Adding new pet:', newPet);
      return this.http.post<PetsListing>(this.apiUrl, newPet);
    } catch (error) {
      console.error('Error adding pet:', error);
      throw error;
    }
  }

  // Remove a pet
  removePet(id: number): Observable<any> {
    try {
      console.log('Removing pet with id:', id);
      return this.http.delete(`${this.apiUrl}/${id}`);
    } catch (error) {
      console.error('Error removing pet:', error);
      throw error;
    }
  }

  // Edit an existing pet
  editPet(id: number, updatedPet: Partial<PetsListing>): Observable<PetsListing> {
    try {
      console.log('Editing pet with id:', id, updatedPet);
      return this.http.patch<PetsListing>(`${this.apiUrl}/${id}`, updatedPet);
    } catch (error) {
      console.error('Error editing pet:', error);
      throw error;
    }
  }
}
