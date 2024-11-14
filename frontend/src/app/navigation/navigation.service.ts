import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { PetsListing } from '../models/pets-listing';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class NavigationService {
  apiUrl = 'http://localhost:3000';

  constructor(private http: HttpClient) {}

  searchPets(query: string): Observable<PetsListing[]> {
    return this.http.get<PetsListing[]>(`${this.apiUrl}/pets/search?q=${query}`);
  }

  getAllPets(): Observable<PetsListing[]> {
    return this.http.get<PetsListing[]>(`${this.apiUrl}/pets`);
  }
}