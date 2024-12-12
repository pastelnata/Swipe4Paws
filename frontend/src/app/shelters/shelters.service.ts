import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';
import { SheltersListing } from '../models/shelters-listing';
@Injectable({
  providedIn: 'root'
})
export class SheltersService {

  baseURL = 'http://localhost:3000/shelters';

  sheltersList: SheltersListing[] = [];

  constructor(private http: HttpClient) {
    this.getAllShelters();
   }

  getAllShelters(): Observable<SheltersListing[]> {
    return this.http.get<SheltersListing[]>(this.baseURL);
  }

  getShelterById(id: number): Observable<SheltersListing> {
    return this.http.get<SheltersListing>(this.baseURL+ '/' + id)
  }

  
}
